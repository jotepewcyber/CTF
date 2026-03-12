from django.urls import path
from .views import (
    CategoryListCreateAPIView, ChallengeListByCategoryAPIView,
    ChallengeCreateAPIView, ChallengeDetailAPIView, ChallengeSolveAPIView
)

urlpatterns = [
    path('categories/', CategoryListCreateAPIView.as_view()),                        # List AND add cat
    path('categories/<int:category_id>/questions/', ChallengeListByCategoryAPIView.as_view()),
    path('create/', ChallengeCreateAPIView.as_view()),
    path('questions/<int:pk>/', ChallengeDetailAPIView.as_view()),
    path('questions/<int:pk>/submit/', ChallengeSolveAPIView.as_view()),
]