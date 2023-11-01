from django.urls import path
from rest_framework.routers import DefaultRouter
from . import api, views

user_router = DefaultRouter()
user_router.register(r'api', api.UserViewSet)

urlpatterns = [
    path('login', views.login_user, name='login'),
]
