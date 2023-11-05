from django.urls import path
from .api import LoginView, CurrentUserView, RegisterView

urlpatterns = [
    path("login/", LoginView.as_view(), name='login'),
    path("current-user/", CurrentUserView.as_view(), name='current_user'),
    path("register/", RegisterView.as_view(), name='register'),
]
