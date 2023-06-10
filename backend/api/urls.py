from django.urls import path, include
from api.views import ProductView, CategoryView, SellerProductView, ColorView
from payment.views import ordered_product_view
urlpatterns = [
    path('accounts/', include('accounts.urls')),
    path('seller/', include('seller.urls')),
    path('cart/', include('cart.urls')),
    path('payment/', include('payment.urls')),
    path('products/', ProductView.as_view()),
    path('products/<slug>/', ProductView.as_view()),
    path('categories/', CategoryView.as_view()),
    path('colors/', ColorView.as_view()),
    
    path('seller-products-listing/', SellerProductView.as_view()),
    path('seller-products-listing/<slug>', SellerProductView.as_view()),
    
    path('ordered_products/', ordered_product_view),
]
