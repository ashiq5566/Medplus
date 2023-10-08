from django.urls import path, re_path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import (
        user_login
)

app_name = "api_v1_accounts"

urlpatterns = [
    # login
    re_path(r"^user-login/$", user_login),


    
    #token authentication jwt
    re_path(r"^token/$", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    re_path(r"^token/refresh/$", TokenRefreshView.as_view(), name="token_refresh"),
]
