
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework import permissions
from .serializers import EventSerializer
from .models import Event

# Create your views here.


def get_date(date):
    months = {
        '01': 'Jan',
        '02': 'Feb',
        '03': 'Mar',
        '04': 'Apr',
        '05': 'May',
        '06': 'Jun',
        '07': 'Jul',
        '08': 'Aug',
        '09': 'Sep',
        '10': 'Oct',
        '11': 'Nov',
        '12': 'Dec',
    }
    date = date.split('T')[0]
    date = date.split('-')
    date[1] = months[date[1]]
    date = [date[2], date[1], date[0]]
    return ' '.join(date)


class EventList(APIView):
    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        for event in serializer.data:
            event["date"] = get_date(event["start_date"])
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
        data = serializer.data.copy()
        data["start_date"] = get_date(data["start_date"])
        data["end_date"] = get_date(data["end_date"])
        return Response(data)

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
