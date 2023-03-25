from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from api.renderer import UserRenderer
from accounts.serializers import SignupSerializer
# Create your views here.

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
    
# User signup page 
class SignupView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = SignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = get_tokens_for_user(user)
        return Response({'token': token, 'message': 'Signup successfully'}, status=status.HTTP_201_CREATED)
        