from django.contrib import admin
from django.views.static import serve
from django.urls import path, include, re_path
from django.conf import settings as SETTINGS


urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),

    # DRF
    path('api/v1/accounts/', include('api.v1.accounts.urls', namespace="api_v1_accounts")),

    # Media & Static
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': SETTINGS.MEDIA_ROOT}),
    re_path(r'^static/(?P<path>.*)$', serve, {'document_root': SETTINGS.STATIC_FILE_ROOT}),
]

