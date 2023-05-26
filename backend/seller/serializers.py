from rest_framework import serializers

from accounts.models import User

from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator

# User signup serializers 
class SellerSignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'password2', 'tc']
        extra_kwargs = {
            'password': {'write_only': True}
        }
        
    # Validate password and comfirm password 
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("Password and confirm password doesn't match")
        return attrs
    
    # If validation True and then create user 
    def create(self, validated_data):
        user = User.objects.create_user(is_staff=True, **validated_data)
        return user
