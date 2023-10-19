from django.urls import path, re_path
from api.v1.payments .views import stripe_checkout, stripe_webhook


app_name = "api_v1_payments"

urlpatterns = [
   re_path(r'^create-checkout-session$', stripe_checkout, name="stripe_checkout"),
   re_path(r'^webhook/$', stripe_webhook, name='stripe_webhook'),
]