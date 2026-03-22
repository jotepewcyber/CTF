from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status
from django.utils import timezone
from .models import Competition
from .serializers import CompetitionSerializer

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAdminUser

class CompetitionInfoAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        try:
            competition = Competition.objects.get(is_active=True)
        except Competition.DoesNotExist:
            return Response(
                {"detail": "No active competition found."},
                status=status.HTTP_404_NOT_FOUND
            )
        now = timezone.now()
        data = {
            "id": competition.id,
            "name": competition.name,
            "start_time": competition.start_time.isoformat(),
            "end_time": competition.end_time.isoformat(),
            "now": now.isoformat(),
            "is_active": competition.is_active,
        }
        return Response(data)



class CompetitionAdminListCreateAPIView(ListCreateAPIView):
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer
    permission_classes = [IsAdminUser]

class CompetitionAdminUpdateAPIView(RetrieveUpdateDestroyAPIView):
    queryset = Competition.objects.all()
    serializer_class = CompetitionSerializer
    permission_classes = [IsAdminUser]