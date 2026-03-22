from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Category, Challenge, ChallengeSolve
from django.db.models import Sum, F
from .serializers import (
    CategorySerializer, ChallengeCardSerializer,
    ChallengeDetailSerializer, SolveSubmissionSerializer, ChallengeCreateSerializer, LeaderboardEntrySerializer
)
from django.shortcuts import get_object_or_404

# === Custom IsAdmin permission (using your User "role" field) ===
from .permissions import IsAdminRole



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

        # First, check if the user has already solved the challenge
        if ChallengeSolve.objects.filter(user=request.user, challenge=challenge).exists():
            return Response(
                {"result": "already_solved", "message": "You have already solved this challenge!"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = SolveSubmissionSerializer(data=request.data)
        if serializer.is_valid():
            submitted_flag = serializer.validated_data['flag']
            if submitted_flag.strip() == challenge.flag.strip():
                ChallengeSolve.objects.create(user=request.user, challenge=challenge)
                return Response({"result": "correct", "message": "Flag correct! Challenge solved."})
            else:
                return Response({"result": "wrong", "message": "Wrong flag!"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    


class ScoreboardAPIView(APIView):
    permission_classes = []  # Public

    def get(self, request):
        # For each user, compute the sum of challenge.points they have solved
        solved_data = (
            ChallengeSolve.objects
            .values(username=F('user__username'))
            .annotate(total_points=Sum('challenge__points'))
            .order_by('-total_points')
        )
        serializer = LeaderboardEntrySerializer(solved_data, many=True)
        return Response(serializer.data)