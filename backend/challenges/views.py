from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Category, Challenge, ChallengeSolve, ChallengeAttachment
from django.db.models import Sum, F
from .serializers import (
    CategorySerializer, ChallengeCardSerializer,
    ChallengeDetailSerializer, SolveSubmissionSerializer, ChallengeCreateSerializer, LeaderboardEntrySerializer
)
from django.shortcuts import get_object_or_404
from .permissions import IsAdminRole
from competition.utils import is_competition_running
from competition.utils import get_active_competition
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status


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



class CategoryDetailAPIView(APIView):
    permission_classes = [IsAdminRole]  # Only admin can edit/delete

    def put(self, request, pk):
        category = get_object_or_404(Category, pk=pk)
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        category = get_object_or_404(Category, pk=pk)
        serializer = CategorySerializer(category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        category = get_object_or_404(Category, pk=pk)
        category.delete()
        return Response({'detail': 'Category deleted.'}, status=status.HTTP_204_NO_CONTENT)

# --- CHALLENGE VIEWS ---

class ChallengeListByCategoryAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, category_id):
        competition = get_active_competition()
        if not competition:
            return Response({"detail": "Competition not running!"}, status=403)
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

class ChallengeEditDeleteAPIView(APIView):
    permission_classes = [IsAdminRole]

    def put(self, request, pk):
        challenge = get_object_or_404(Challenge, pk=pk)
        serializer = ChallengeCreateSerializer(challenge, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk):
        challenge = get_object_or_404(Challenge, pk=pk)
        serializer = ChallengeCreateSerializer(challenge, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        challenge = get_object_or_404(Challenge, pk=pk)
        challenge.delete()
        return Response({'detail': 'Challenge deleted.'}, status=status.HTTP_204_NO_CONTENT)
    
class ChallengeAttachmentUploadAPIView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, pk):
        files = request.FILES.getlist('files')
        if not files:
            return Response({'detail': 'No files uploaded.'}, status=400)
        try:
            challenge = Challenge.objects.get(pk=pk)
        except Challenge.DoesNotExist:
            return Response({'detail': 'Challenge not found.'}, status=404)

        duplicated = []
        uploaded = []

        for f in files:
            # Check if this file name already exists for the challenge:
            if ChallengeAttachment.objects.filter(challenge=challenge, filename=f.name).exists():
                duplicated.append(f.name)
                continue
            ChallengeAttachment.objects.create(challenge=challenge, file=f, filename=f.name)
            uploaded.append(f.name)

        if duplicated and not uploaded:
            return Response(
                {'detail': f'Duplicate file(s) not uploaded: {", ".join(duplicated)}'}, 
                status=400
            )
        elif duplicated:
            return Response(
                {'detail': f'Some files uploaded, duplicates skipped: {", ".join(duplicated)}'},
                status=200
            )
        else:
            return Response({'detail': 'Files uploaded!'}, status=201)


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
        if not is_competition_running():
            return Response(
                {'detail': 'Competition is not running.'},
                status=status.HTTP_403_FORBIDDEN
            )
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