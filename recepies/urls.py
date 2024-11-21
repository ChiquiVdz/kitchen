from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from .views import RecepieView, IngredientView

router = routers.DefaultRouter()
router.register(r'recepies', RecepieView, 'Recepies')
router.register(r'ingredients', IngredientView, 'Ingredients')

urlpatterns = [
    path("api/v1/", include(router.urls)),   
]

