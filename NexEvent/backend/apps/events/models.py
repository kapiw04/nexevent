from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Event(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.TextField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    duration = models.IntegerField()
    location = models.CharField(max_length=100)
    image = models.ImageField(
        upload_to='images/', default='images/default.jpg', blank=True, null=True)
    is_active = models.BooleanField(default=False)
    is_public = models.BooleanField(default=False)
    attendees = models.ManyToManyField(
        User, related_name='attendees', blank=True, default=None)
    # owner = models.ForeignKey(
    #     User, related_name='owner', on_delete=models.CASCADE, default=None, null=True)

    def __str__(self):
        return self.name

    def add_attendee(self, user):
        self.attendees.add(user)
        self.save()
