from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from .views import RecepieView

router = routers.DefaultRouter()
router.register(r'recepies', RecepieView, 'Recepies')

urlpatterns = [
    path("api/v1/", include(router.urls))    
]
