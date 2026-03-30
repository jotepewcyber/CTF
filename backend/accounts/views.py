from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import User
from .serializers import UserRegisterSerializer, UserDisplaySerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated, BasePermission
from django.shortcuts import get_object_or_404

class IsAdminRole(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and getattr(request.user, "role", None) == "admin")

# --- Registration ---
class RegisterAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# --- Login (JWT Access in body, Refresh in HttpOnly cookie) ---
class LoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            refresh_token = str(refresh)
            response = Response({'access': access_token}, status=status.HTTP_200_OK)
            # Place refresh token in HttpOnly cookie
            response.set_cookie(
                key='refresh_token',
                value=refresh_token,
                httponly=True,
                # secure=True,    # Set True in production
                samesite='Lax', # Or 'Strict' for extra security
                max_age=60 * 60 * 24 * 7,  # 1 week; match your token settings
            )
            return response
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        
class UserListAPIView(APIView):
    permission_classes = [IsAdminRole]
    
    def get(self, request):
        users = User.objects.all()
        serializer = UserDisplaySerializer(users, many=True)
        return Response(serializer.data)
    
class UserDetailAdminAPIView(APIView):
    permission_classes = [IsAdminRole]

    def get(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        serializer = UserDisplaySerializer(user)
        return Response(serializer.data)

    def put(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        serializer = UserDisplaySerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User updated.'})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        user.delete()
        return Response({'message': 'User deleted.'}, status=status.HTTP_204_NO_CONTENT)

# --- User Profile Management ---
class UserDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserDisplaySerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        """Update current user"""
        serializer = UserDisplaySerializer(
            request.user, 
            data=request.data, 
            partial=True
        )
        if serializer.is_valid():
            serializer.save()
            # ✅ Return the complete updated user
            return Response({
                "message": "Profile updated successfully",
                "user": UserDisplaySerializer(request.user).data  # ✅ Complete user
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# --- Custom Refresh View (gets refresh token from cookie) ---
class CustomTokenRefreshView(APIView):
    permission_classes = []
    authentication_classes = []

    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token is None:
            return Response({'error': 'No refresh token found in cookies.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)
            return Response({'access': access_token})
        except Exception:
            return Response({'error': 'Invalid refresh token.'}, status=status.HTTP_401_UNAUTHORIZED)