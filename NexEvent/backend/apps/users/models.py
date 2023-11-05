from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class UserProfile(models.Model):
    user = models.OneToOneField(
        User, related_name='profile', on_delete=models.CASCADE)
    bio = models.TextField()
    image = models.ImageField(
        upload_to='images/', default='images/default.jpg', blank=True, null=True)
    is_organizer = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username
