from django.urls import path
from cart.views import CartView
urlpatterns = [
    path('', CartView.as_view()),
    path('<pk>/', CartView.as_view()),
]
