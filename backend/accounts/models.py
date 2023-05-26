from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# Create your models here.

# Creating a User modal manager 
class UserManager(BaseUserManager):
    def create_user(self, email, name, tc, password=None, password2=None, **extra_fields):
        """
        Creates and saves a User with the given email, name, and password, tc.
        """
        if not email:
            raise ValueError('Users must have an email address')

        email = self.normalize_email(email)
        user = self.model(email=email,name=name, tc=tc, **extra_fields)
        user.set_password(password)
        user.save()
        return user


    def create_superuser(self, email, name, tc, password=None, **extra_fields):
        """
        Creates and saves a superuser with the given email, name, and password tc.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        
        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self.create_user(email,name, tc, password, **extra_fields)



# Creating a new User Modal 
class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name='email', max_length=255, unique=True)
    name = models.CharField(max_length=255)
    tc = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    
    
    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'tc', ]
    
    def __str__(self) -> str:
        return self.email
    