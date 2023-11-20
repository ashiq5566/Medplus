from django.urls import path, re_path
from .views import create_doctor, doctors

app_name = "api_v1_doctors"

urlpatterns = [
   re_path(r"^create-doctor/$", create_doctor),
   re_path(r"^$", doctors),
   # re_path(r'^generate-qr/(?P<mobile_number>\d+)/$', generate_qr_code, name='generate_qr_code'),
]