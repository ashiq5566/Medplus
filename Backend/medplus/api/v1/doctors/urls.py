from django.urls import path, re_path
from .views import create_doctor

app_name = "api_v1_doctors"

urlpatterns = [
   re_path(r"^create-doctor/$", create_doctor),
]