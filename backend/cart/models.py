from django.db import models
from django.conf import settings
from api.models import Product
# Create your models here.
class Cart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    total_amt = models.PositiveIntegerField(default=0, blank=True, null=True)
    
    def __str__(self):
        return self.user.email
    
    
class CartItems(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='cart_items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    market_price = models.PositiveIntegerField()
    selling_price = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()
    image = models.ImageField(upload_to='cart_image', blank=True, null=True)
    
    def __str__(self):
        return self.product.title
    