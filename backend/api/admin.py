from django.contrib import admin
from api.models import Product, Category, Color
# Register your models here.

admin.site.register(Category)
admin.site.register(Color)
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display= ['vendor','category', 'title']
    prepopulated_fields = {"slug": ["title",]}
    

