from django.contrib import admin
from .models import Doctor

# Register your models here.
class DoctorAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone', 'qualification','username','is_deleted')
    search_fields = ('name', 'phone_number', 'email', 'qualification', 'username')
admin.site.register(Doctor, DoctorAdmin)