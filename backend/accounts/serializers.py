from rest_framework import serializers
from accounts.models import User

class SignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = User
        fields = ['name', 'email', 'password', 'password2', 'tc']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("Password and confirm password doesn't match")
        return attrs
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)