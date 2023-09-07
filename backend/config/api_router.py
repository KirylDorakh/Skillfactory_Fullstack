from rest_framework import routers

from staff.api.viewsets import LocationViewSet, ItemViewSet

router = routers.DefaultRouter()

router.register('locations', LocationViewSet)
router.register('items', ItemViewSet)
