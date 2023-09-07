
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from publicposts import views

from .api_router import router

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/posts/', views.posts),
    path('api/v1/like_post/<int:post_id>/', views.like_post),
    path('api/v1/delete_post/<int:post_id>/', views.delete_post),
    path('api/v2/', include(router.urls))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
