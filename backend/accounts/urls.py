from django.urls import path
from accounts.views import (
    SignupView, 
    LoginView,
    ProfileView,
    ChangePasswordView,
    SendPasswordResetEmailView,
    ResetPasswordView
)
urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup_view'),
    path('login/', LoginView.as_view(), name='login_view'),
    path('profile/', ProfileView.as_view(), name='profile_view'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password_view'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send_reset_password_email_view'),
    path('reset-password/<uid>/<token>/', ResetPasswordView.as_view(), name='reset_password_view'),

]
