from django.urls import path, re_path
from api.v1.payments .views import stripe_checkout, stripe_webhook, create_payment, get_config


app_name = "api_v1_payments"

urlpatterns = [
   re_path(r'^create-checkout-session$', stripe_checkout, name="stripe_checkout"),
   re_path(r'^webhook/$', stripe_webhook, name='stripe_webhook'),
   re_path(r'^create-payment-intent$', create_payment, name='create_payment'),
   re_path(r'^config$', get_config, name='get_config'),
]
