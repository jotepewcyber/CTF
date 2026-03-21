from django.urls import path
from .views import (
    CategoryListCreateAPIView, ChallengeListByCategoryAPIView,
    ChallengeCreateAPIView, ChallengeDetailAPIView, ChallengeSolveAPIView, ScoreboardAPIView
)

urlpatterns = [
    path('categories/', CategoryListCreateAPIView.as_view()),                     
    path('categories/<int:category_id>/questions/', ChallengeListByCategoryAPIView.as_view()),
    path('questions/create/', ChallengeCreateAPIView.as_view()),
    path('questions/<int:pk>/', ChallengeDetailAPIView.as_view()),
    path('questions/<int:pk>/submit/', ChallengeSolveAPIView.as_view()),

    # scoreboard endpoint
    path('scoreboard/', ScoreboardAPIView.as_view(), name='scoreboard'),
]