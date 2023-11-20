from django.db import models
from general.models import BaseModel
from accounts.models import User
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser, Group

from api.v1.accounts.functions import encrypt
from api.v1.general.functions import get_auto_id

DEPARTMENT_CHOICES = [
        ('cardiology', 'Cardiology'),
        ('dermatology', 'Dermatology'),
        ('orthopedics', 'Orthopedics'),
        ('pediatrics', 'Pediatrics'),
        ('neurology', 'Neurology'),
        # Add more departments as needed
    ]

class Doctor(BaseModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=128)
    email = models.EmailField(max_length=50, null=True,blank=True)
    phone = models.CharField(max_length=20)
    qualification = models.CharField(max_length=200)
    image = models.ImageField(upload_to='doctors/profile_pic/', null=True, blank=True)
    department = models.CharField(choices=DEPARTMENT_CHOICES)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(blank=True, null=True)
    location = models.CharField(blank=True, null=True)
    
    
    def save(self, *args, **kwargs):
        if self._state.adding:
            ep_username = self.username
            ep_password = self.password

            user = User.objects.create_user(username=ep_username, password=ep_password)
            self.password = encrypt(ep_password)
            ru_group, created = Group.objects.get_or_create(
                name="doctor"
            )
            ru_group.user_set.add(user)
            self.user = user
    
            auto_id = get_auto_id(Doctor)
            self.auto_id = auto_id

        super(Doctor, self).save(*args, **kwargs)
        

class QRCode(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, null=True, blank=True)
    code = models.ImageField(max_length=255)
    
    def __str__(self):
        return self.doctor.name