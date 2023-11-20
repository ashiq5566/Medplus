from django.urls import path, re_path
from .views import create_doctor, doctors, upload_doctor_excel

app_name = "api_v1_doctors"

urlpatterns = [
   re_path(r"^upload-excel/$", upload_doctor_excel),
   re_path(r"^create-doctor/$", create_doctor),
   re_path(r"^$", doctors)
]