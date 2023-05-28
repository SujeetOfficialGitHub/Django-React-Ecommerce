from django.urls import path, include
from api.views import ProductView, CategoryView, SellerProductView
urlpatterns = [
    path('accounts/', include('accounts.urls')),
    path('seller/', include('seller.urls')),
    path('cart/', include('cart.urls')),
    path('products/', ProductView.as_view()),
    path('products/<slug>/', ProductView.as_view()),
    path('categories/', CategoryView.as_view()),
    
    path('seller-products-listing/', SellerProductView.as_view()),
    path('seller-products-listing/<slug>', SellerProductView.as_view()),
    # path('cart/', CartView.as_view()),
]
