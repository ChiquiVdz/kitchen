from rest_framework import viewsets
from .serializer import RecepieSerializer, IngredientSerializer
from .models import Recepie, Ingredient

# Create your views here.

class RecepieView(viewsets.ModelViewSet):
    serializer_class = RecepieSerializer
    queryset = Recepie.objects.all()
    
class IngredientView(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer