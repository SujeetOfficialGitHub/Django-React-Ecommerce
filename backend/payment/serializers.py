from rest_framework import serializers
from payment.models import Order, OrderItems

class OrderSerializer(serializers.ModelSerializer):
    order_date = serializers.DateTimeField(format="%d %B %Y %I:%M %p")
    class Meta:
        model = Order
        fields = '__all__'
        
        
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItems
        fields = '__all__'