from django.contrib import admin
from cart.models import Cart, CartItems
# Register your models here.

# @admin.register(CartItems)
class CartAdmin(admin.StackedInline):
    model = CartItems
    # list_display = ['cart', 'product', 'market_price', 'selling_price', 'quantity']

@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ['user', 'total_amt']
    inlines = [CartAdmin]