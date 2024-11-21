from django.db import models

# Create your models here.
    
class Ingredient(models.Model):
    name = models.CharField(max_length=100, unique=True)
    calories_per_100g = models.DecimalField(max_digits=6, decimal_places=2)
    
    def __str__(self):
        return self.name
    
class Recepie(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    cooking_time = models.IntegerField()
    instructions = models.TextField()
    ingredients = models.ManyToManyField(Ingredient, through='RecepieIngredient')
    
    def __str__(self):
        return self.title

class RecepieIngredient(models.Model):
    recepie = models.ForeignKey(Recepie, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=5, decimal_places=2)
    unit = models.CharField(max_length=20)
    
    def __str__(self):
        return f"{self.quantity} {self.unit} of {self.ingredient.name} for {self.recepie.title}"