from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Category, Challenge, ChallengeSolve
from .serializers import (
    CategorySerializer, ChallengeCardSerializer,
    ChallengeDetailSerializer, SolveSubmissionSerializer, ChallengeCreateSerializer
)
from django.shortcuts import get_object_or_404

# === Custom IsAdmin permission (using your User "role" field) ===
from rest_framework.permissions import BasePermission

class IsAdminRole(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and getattr(request.user, "role", None) == "admin"

# --- CATEGORY VIEWS ---
class CategoryListCreateAPIView(APIView):
    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdminRole()]
        return [permissions.AllowAny()]
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

# --- CHALLENGE VIEWS ---

class ChallengeListByCategoryAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, category_id):
        challenges = Challenge.objects.filter(category_id=category_id)
        serializer = ChallengeCardSerializer(challenges, many=True)
        return Response(serializer.data)

class ChallengeCreateAPIView(APIView):
    permission_classes = [IsAdminRole]
    def post(self, request):
        serializer = ChallengeCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class ChallengeDetailAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, pk):
        challenge = get_object_or_404(Challenge, pk=pk)
        serializer = ChallengeDetailSerializer(challenge)
        return Response(serializer.data)

# --- SOLVE FLAG VIEWS ---

class ChallengeSolveAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request, pk):
        challenge = get_object_or_404(Challenge, pk=pk)
        serializer = SolveSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            submitted_flag = serializer.validated_data['flag']
            # Case-insensitive compare and strip
            if submitted_flag.strip() == challenge.flag.strip():
                # Create solve if not already solved
                solve, created = ChallengeSolve.objects.get_or_create(
                    user=request.user, challenge=challenge
                )
                if created:
                    return Response({"result": "correct", "message": "Flag correct! Challenge solved."})
                else:
                    return Response({"result": "already_solved", "message": "Challenge already solved."})
            else:
                return Response({"result": "wrong", "message": "Wrong flag!"}, status=400)
        return Response(serializer.errors, status=400)    
