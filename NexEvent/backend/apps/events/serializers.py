from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    start_date = serializers.DateTimeField(format="%d %b %Y")
    end_date = serializers.DateTimeField(format="%d %b %Y")
    start_time = serializers.TimeField(format="%I:%M %p")
    end_time = serializers.TimeField(format="%I:%M %p")

    class Meta:
        model = Event
        fields = '__all__'
        # fields = ['id', 'name', 'description', 'start_date', 'end_date', '
