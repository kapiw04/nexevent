
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework import permissions
from .serializers import EventSerializer
from .models import Event

# Create your views here.


class EventList(APIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EventSerializer(data=request.data)
        if serializer.is_valid():
            # serializer.save(owner=request.user)
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EventDetail(APIView):
    def get_object(self, pk):
        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        event = self.get_object(pk)
        serializer = EventSerializer(event)
        return Response(serializer.data)

    def put(self, request, pk):
        event = self.get_object(pk)
        serializer = EventSerializer(event, data=request.data)
        if serializer.is_valid():
            # serializer.save(owner=request.user)
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        event = self.get_object(pk)
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class EventAttendees(APIView):
    def get_object(self, pk):
        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        event = self.get_object(pk)
        attendees = event.attendees.all()
        serializer = EventSerializer(attendees, many=True)
        return Response(serializer.data)

    def post(self, request, pk):
        event = self.get_object(pk)
        event.attendees.add(request.user)
        return Response(status=status.HTTP_200_OK)


# class EventOwner(APIView):
#     def get_object(self, pk):
#         try:
#             return Event.objects.get(pk=pk)
#         except Event.DoesNotExist:
#             return Response(status=status.HTTP_404_NOT_FOUND)

#     def get(self, request, pk):
#         event = self.get_object(pk)
#         owner = event.owner
#         serializer = EventSerializer(owner)
#         return Response(serializer.data)


class JoinEvent(APIView):
    def get_object(self, pk):
        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, pk):
        event = self.get_object(pk)
        event.attendees.add(request.user)
        return Response(status=status.HTTP_200_OK)


class LeaveEvent(APIView):
    def get_object(self, pk):
        try:
            return Event.objects.get(pk=pk)
        except Event.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def post(self, request, pk):
        event = self.get_object(pk)
        event.attendees.remove(request.user)
        return Response(status=status.HTTP_200_OK)


class UsersEvents(APIView):
    def get(self, request):
        events = Event.objects.filter(attendees=request.user)
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)


class IsAttending(APIView):
    def get(self, request, pk):
        event = Event.objects.get(pk=pk)
        if request.user in event.attendees.all():
            return Response({"is_attending": True})
        else:
            return Response({"is_attending": False})
