from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from api.models import Product
from cart.models import Cart, CartItems
from cart.serializers import CartSerialzer, CartItemsSerialzer
from api.renderer import UserRenderer
# Create your views here.
class CartView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [UserRenderer]
    def get(self, request, format=None):
        queryset = Cart.objects.filter(user=request.user)
        serialize = CartSerialzer(queryset, many=True)
        return Response(serialize.data)
    
    def post(self, request, format=None):
        product = Product.objects.get(id=request.data['id'])
        cart, _ = Cart.objects.get_or_create(user=request.user)

        serialize = CartItemsSerialzer(data=request.data)
        serialize.is_valid(raise_exception=True)
        serialize.save(cart=cart, product=product)
        
        selling_price = serialize.validated_data['selling_price']
        
        cart.total_amt += selling_price
        cart.save()
        return Response({'cart': serialize.data})
    

    def put(self, request, pk, format=None):
        cart = Cart.objects.get(user=request.user)
        cart_item = get_object_or_404(CartItems, id=pk)
        quantity = request.data['quantity']
        if quantity == -1 and cart_item.quantity == 1:
            cart_item.quantity = 0
            serialize = CartItemsSerialzer(cart_item)
            cart.total_amt = cart.total_amt + (quantity*cart_item.selling_price)
            cart.save()
            cart_item.delete()
            return Response({'cart': serialize.data})
        
        cart_item.quantity += quantity
        cart_item.save()
        cart.total_amt = cart.total_amt + (quantity*cart_item.selling_price)
        cart.save()
        queryset = CartItems.objects.get(id=pk)
        serialize = CartItemsSerialzer(queryset)
        return Response({'cart': serialize.data})
    
    def delete(self, request, pk, format=None):
        queryset = CartItems.objects.get(id=pk)
        serialize = CartItemsSerialzer(queryset)
        cart = Cart.objects.get(user=request.user)
        cart.total_amt = cart.total_amt - queryset.quantity * queryset.selling_price
        cart.save()
        queryset.delete()
        return Response({'cart': serialize.data})