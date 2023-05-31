from django.urls import path

from payment.views import start_payment, handle_payment_success
urlpatterns = [
    path('pay/', start_payment, name="payment"),
    path('success/', handle_payment_success, name="payment_success"),
]