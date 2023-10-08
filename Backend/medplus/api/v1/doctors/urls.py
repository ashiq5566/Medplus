# from django.urls import path, re_path

# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )
# from .views import (
#         executive_profile_login,
#         user_login,
#         signup_enter_phone,
#         signup_verify_phone,
#         user_resend_otp,
#         user_set_profile,
#         create_agent,
#         create_counselor,
#         agents,
#         counselors,
#         agent_profile,
#         login_enter_phone,
#         user_details,
#         counselor_profile
# )

# app_name = "api_v1_accounts"

# urlpatterns = [
#     # login
#     re_path(r"^executive_profile-login/$", executive_profile_login),
#     re_path(r"^user-login/$", user_login),
#     re_path(r"^student-login/$", login_enter_phone),
#     re_path(r"^user-detail/$", user_details),
    
#     #otp
#     re_path(r"^signup/enter-phone/$", signup_enter_phone),
#     re_path(r"^signup/verify-phone/$", signup_verify_phone),
#     re_path(r"^signup/resent-otp/$", user_resend_otp),

#     #profile
#     re_path(r"^set-profile/$", user_set_profile),
    
#     # agent
#     re_path(r"^create-agent/$", create_agent),
#     re_path(r"^agents/$", agents),
#     re_path(r"^agent-profile/(?P<pk>.*)/$", agent_profile),
    
#     # counselor
#     re_path(r"^create-counselor/$", create_counselor),
#     re_path(r"^counselors/$", counselors),
#     re_path(r"^counselor-profile/(?P<pk>.*)/$", counselor_profile),

    
#     #token authentication jwt
#     re_path(r"^token/$", TokenObtainPairView.as_view(), name="token_obtain_pair"),
#     re_path(r"^token/refresh/$", TokenRefreshView.as_view(), name="token_refresh"),
# ]
