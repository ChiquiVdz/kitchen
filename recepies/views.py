from rest_framework import viewsets
from .serializer import RecepieSerializer
from .models import Recepie

# Create your views here.

class RecepieView(viewsets.ModelViewSet):
    serializer_class = RecepieSerializer
    queryset =Recepie.objects.all()