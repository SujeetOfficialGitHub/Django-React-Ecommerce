from rest_framework import serializers
from api.models import Product
from accounts.models import User
from cart.models import Cart, CartItems

class CartItemsSerialzer(serializers.ModelSerializer):
    product = serializers.StringRelatedField()
    class Meta:
        model = CartItems
        fields =  [ 'id', 'product', 'market_price', 'selling_price', 'quantity', 'image']
        

    def create(self, validated_data):
        cart = validated_data.pop('cart')
        product = validated_data.pop('product')


        cart_items = CartItems.objects.create(
            cart = cart,
            product = product,
            market_price = validated_data['market_price'],
            selling_price = validated_data['selling_price'],
            quantity = validated_data['quantity'],
            image = product.image
        )
        return cart_items
        
               
class CartSerialzer(serializers.ModelSerializer):
    cart_items = CartItemsSerialzer(many=True)
    class Meta:
        model = Cart
        fields =  ['id', 'user', 'total_amt', 'cart_items']
    
        
    
