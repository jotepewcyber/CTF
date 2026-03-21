from django.urls import path
from .views import RegisterAPIView, LoginAPIView, CustomTokenRefreshView, UserDetailAPIView, UserListAPIView

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('refresh/', CustomTokenRefreshView.as_view(), name='refresh'),
    path('me/', UserDetailAPIView.as_view(), name='user_detail'),

    path('users/', UserListAPIView.as_view(), name='user-list'),
]