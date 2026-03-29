from django.urls import path
from .views import (
    CategoryListCreateAPIView, ChallengeListByCategoryAPIView,
    ChallengeCreateAPIView, ChallengeDetailAPIView, ChallengeSolveAPIView, ScoreboardAPIView, ChallengeAttachmentUploadAPIView, CategoryDetailAPIView, ChallengeEditDeleteAPIView
)
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('categories/', CategoryListCreateAPIView.as_view()),                     
    path('categories/<int:pk>/edit/', CategoryDetailAPIView.as_view()),         
    path('categories/<int:category_id>/questions/', ChallengeListByCategoryAPIView.as_view()),
    path('questions/create/', ChallengeCreateAPIView.as_view()),
    path('questions/<int:pk>/get/', ChallengeDetailAPIView.as_view()), 
    path('questions/<int:pk>/edit/', ChallengeEditDeleteAPIView.as_view()), 
    path('questions/<int:pk>/submit/', ChallengeSolveAPIView.as_view()),
    path('questions/<int:pk>/attachments/', ChallengeAttachmentUploadAPIView.as_view()),

    # scoreboard endpoint
    path('scoreboard/', ScoreboardAPIView.as_view(), name='scoreboard'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)