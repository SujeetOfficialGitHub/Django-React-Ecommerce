from django.db import models
from django.conf import settings
from api.models import Product
from cart.models import Cart, CartItems
# Create your models here.

ORDER_STATUS_CHOICE = (
    ('process', 'In Process'),
    ('shipped', 'Shipped'),
    ('delivered', 'Delivered')
)
class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    total_amt = models.PositiveIntegerField()
    payment_id = models.CharField(max_length=100, null=True)
    paid_status = models.BooleanField(default=False)
    order_date = models.DateTimeField(auto_now_add=True)
    order_status = models.CharField(choices=ORDER_STATUS_CHOICE, default='process', max_length=100)
    
class OrderItems(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    order=models.ForeignKey(Order,on_delete=models.CASCADE)
    payment_id = models.CharField(max_length=100)
    title = models.CharField(max_length=250)
    image=models.CharField(max_length=200)
    quantity=models.PositiveIntegerField(null=True)
    price=models.PositiveIntegerField()
    total=models.PositiveIntegerField()

 