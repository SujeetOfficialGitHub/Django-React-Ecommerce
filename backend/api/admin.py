from django.contrib import admin
from api.models import Product, Category
# Register your models here.

admin.site.register(Category)
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display= ['vendor','category', 'title']
    prepopulated_fields = {"slug": ["title",]}
    

