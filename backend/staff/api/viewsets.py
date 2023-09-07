from rest_framework import viewsets

from ..models import Item, Location
from .serializers import LocationSerializer, ItemSerializer


class LocationViewSet(viewsets.ModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

    def get_queryset(self):
        queryset = Item.objects.all()
        print(queryset)
        request_location = self.request.query_params.get('location')
        print(self.request.query_params)
        if request_location is not None:
            try:
                queryset = queryset.filter(location=request_location)
            except:
                pass
        return queryset
