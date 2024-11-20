from rest_framework import serializers
from .models import Recepie

class RecepieSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = Recepie