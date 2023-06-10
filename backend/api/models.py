from django.db import models
from django.contrib.auth.models import User
from django.conf import settings
import uuid
from django.utils.text import slugify

class Category(models.Model):
    title = models.CharField(max_length=100, blank=True, null=True)
    
    def __str__(self):
        return self.title
    
class Color(models.Model):
    title = models.CharField(max_length=50)
    
    def __str__(self):
        return self.title
    
    
def upload_path(instance, filename):
    return '/'.join(['products', str(instance.title), filename])

class Product(models.Model):
    vendor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=100,unique=True, blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null=True)
    market_price = models.PositiveIntegerField(blank=True, null=True)
    selling_price = models.PositiveIntegerField(blank=True, null=True)
    color = models.ForeignKey(Color, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(upload_to=upload_path, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            value = self.title[0:40]
            self.slug = slugify(value, allow_unicode=True) + str(uuid.uuid4())
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.title
    