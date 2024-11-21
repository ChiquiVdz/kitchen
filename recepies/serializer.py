from rest_framework import serializers
from .models import Recepie, Ingredient

class RecepieSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Recepie
        
class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Ingredient