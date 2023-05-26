from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth import authenticate

from api.renderer import UserRenderer
from accounts.serializers import (
    SignupSerializer,
    LoginSerializer,
    ProfileSerializer,
    ChangePasswordSerializer,
    SendPasswordResetEmailSerializer,
    ResetPasswordSerializer
)

# Token generator function 
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
    
# User signup class 
class SignupView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = SignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)
        return Response({'token': token, 'message': 'Signup successfully'}, status=status.HTTP_201_CREATED)
  
# User login class   
class LoginView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = LoginSerializer(data= request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.data.get('email')
        password = serializer.data.get('password')
        user = authenticate(email=email, password=password)
        if user is not None:
            token = get_tokens_for_user(user)
            return Response({'token': token,'seller': user.is_staff, 'message': "Login successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response({'errors': {'non_field_errors': ['Email or password is not valid']}}, status=status.HTTP_400_BAD_REQUEST)

# User Profile class
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [UserRenderer]
    def get(self, request, format=None):
        serializer = ProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# User change password class      
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        print(request.data)
        serializer = ChangePasswordSerializer(data= request.data, context={'user': request.user})
        serializer.is_valid(raise_exception=True)
        return Response({'message': 'Password changed successfully'})
    
# User send password reset mail class
class SendPasswordResetEmailView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = SendPasswordResetEmailSerializer(data= request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'message': "Password reset link send. Please check your email"}, status=status.HTTP_200_OK)
    
# User reset password class
class ResetPasswordView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, uid, token, format=None):
        serializer = ResetPasswordSerializer(data=request.data, context={'uid': uid, 'token': token})
        serializer.is_valid(raise_exception=True)
        return Response({'message': 'Password reset successfully'}, status=status.HTTP_200_OK)