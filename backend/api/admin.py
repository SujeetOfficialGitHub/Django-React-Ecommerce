from django.contrib import admin
from api.models import Category, Brand, Product
# Register your models here.

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display= ['category_title']
    prepopulated_fields = {"category_slug": ["category_title",]}
    
@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display= ['brand_title']
    prepopulated_fields = {"brand_slug": ["brand_title",]}

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display= ['title']
    prepopulated_fields = {"slug": ["title",]}