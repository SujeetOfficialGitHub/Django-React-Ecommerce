from django.urls import path, include
from api.views import ProductView
urlpatterns = [
    path('accounts/', include('accounts.urls')),
    path('products/', ProductView.as_view(), name='product_view')
]
