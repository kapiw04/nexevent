from django.urls import path
from . import views

urlpatterns = [
    path('', views.EventList.as_view()),
    path('<int:pk>/', views.EventDetail.as_view()),
    path('<int:pk>/attendees/', views.EventAttendees.as_view()),
    path('join/<int:pk>/', views.JoinEvent.as_view()),
    path('users-events/', views.UsersEvents.as_view()),
]
