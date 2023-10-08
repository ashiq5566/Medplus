from django.db import models
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser, Group



class User(AbstractUser):
    name = models.CharField(max_length=100)
    email = models.EmailField(null=True,blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)
    encrypted_password = models.TextField(null=True, blank=True)
    is_otp_verified = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    
    class Meta:
        db_table = 'accounts_user'
        verbose_name = 'user'
        verbose_name_plural = 'Users'
        ordering = ('-name',)

    def __str__(self):
        return self.name