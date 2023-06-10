from .models import Category, Product
from rest_framework import serializers
from accounts.models import User


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title']

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title']

class ProductSerializer(serializers.ModelSerializer):
    vendor = serializers.StringRelatedField()
    category = serializers.StringRelatedField()
    color = serializers.StringRelatedField()
    class Meta:
        model = Product
        fields = ['id', 'vendor', 'title', 'slug', 
                  'category', 'market_price', 'selling_price', 
                  'color', 'image', 'description'
                  ]
    

