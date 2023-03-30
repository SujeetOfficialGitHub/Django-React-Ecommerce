from django.db import models

# Create your models here.
    
class Category(models.Model):
    category_title = models.CharField(max_length=200, blank=True, null=True)
    category_slug = models.SlugField(max_length=100, blank=True, null=True)
    
    def __str__(self) -> str:
        return self.category_title
  
class Brand(models.Model):
    brand_title = models.CharField(max_length=100, blank=True, null=True)
    brand_slug = models.SlugField(max_length=100, blank=True, null=True)
    
    def __str__(self) -> str:
        return self.brand_title
    
class Product(models.Model):
    title = models.CharField(max_length=200, blank=True, null=True)
    slug = models.SlugField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    price = models.PositiveIntegerField(blank=True, null=True)
    selling_price = models.PositiveIntegerField(blank=True, null=True)
    rating = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    stock = models.PositiveIntegerField(default=0, blank=True, null=True)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True, null=True)
    thumbnail = models.ImageField(upload_to='thumbnail', blank=True, null=True)
    images = models.ImageField(upload_to='product', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self) -> str:
        return self.title