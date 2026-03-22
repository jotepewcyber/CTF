from django.urls import path
from .views import (
    CompetitionInfoAPIView,
    CompetitionAdminListCreateAPIView,
    CompetitionAdminUpdateAPIView,
)

urlpatterns = [
    path('info/', CompetitionInfoAPIView.as_view(), name='competition-info'),
    # Admin endpoints:
    path('admin/', CompetitionAdminListCreateAPIView.as_view(), name='competition-admin-list-create'),
    path('admin/<int:pk>/', CompetitionAdminUpdateAPIView.as_view(), name='competition-admin-update'),
]