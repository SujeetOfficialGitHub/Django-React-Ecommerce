from django.shortcuts import render
from rest_framework.response import Response
from api.models import Product
from api.serializers import ProductSerializer
from rest_framework.views import APIView
# Create your views here.

class ProductView(APIView):
    def get(self, request, format=None):
        product = Product.objects.all()
        serializer = ProductSerializer(product, many=True)
        return Response(serializer.data)