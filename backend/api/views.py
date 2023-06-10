from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from django.shortcuts import get_object_or_404

from .models import Category, Product, Color
from api.serializers import CategorySerializer, ProductSerializer, ColorSerializer

class CategoryView(APIView):
    def get(self, request, format=None):
        queryset = Category.objects.all()
        serialize = CategorySerializer(queryset, many=True)
        return Response(serialize.data)

class ColorView(APIView):
    def get(self, request, format=None):
        queryset = Color.objects.all()
        serialize = ColorSerializer(queryset, many=True)
        return Response(serialize.data)
    
class ProductView(APIView):
    def get(self, request, slug=None, format=None):
        if slug:
            queryset = get_object_or_404(Product, slug=slug)
            serialize = ProductSerializer(queryset)
            return Response(serialize.data)
        else:   
            queryset = Product.objects.all()
            serialize = ProductSerializer(queryset, many=True)
            return Response(serialize.data)

    

class SellerProductView(APIView):
    def get(self, request, format=None):
        queryset = Product.objects.filter(vendor=request.user).order_by('-created_at')
        serialize = ProductSerializer(queryset, many=True)
        return Response(serialize.data)
    
    def post(self, request, format=None):
        category = Category.objects.get(title=request.data['category'])
        color = Color.objects.get(title=request.data['color'])
        serialize = ProductSerializer(data=request.data)
        serialize.is_valid(raise_exception=True)
        serialize.save(vendor=request.user, category=category, color=color)
        return Response(serialize.data)
    
    def put(self, request, slug, format=None):
        queryset = Product.objects.get(slug=slug)
        serialize = ProductSerializer(queryset, data=request.data)
        serialize.is_valid(raise_exception=True)
        serialize.save(vendor=request.user)
        return Response(serialize.data)
    
    def delete(self, request, slug, format=None):
        queryset = Product.objects.get(slug=slug)
        serialize = ProductSerializer(queryset)
        queryset.delete()
        return Response(serialize.data)


   