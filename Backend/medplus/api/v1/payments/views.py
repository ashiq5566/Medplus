import json
import os

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

from django.shortcuts import redirect
from rest_framework.decorators import api_view
from payments.models import Payment


import stripe

stripe.api_key = settings.STRIPE_SECRET_KEY
            
@api_view(['POST'])
@permission_classes((AllowAny,))
def stripe_checkout(request):
    checkout_session = stripe.checkout.Session.create(
        line_items=[
            {
                'price': 'price_1O2TeRSHy7xAt7koRapUHdOI',
                'quantity': 1,
            },
        ],
        payment_method_types=['card'],
        mode='payment',
        success_url=settings.SITE_URL + '/?success=true&session_id={CHECKOUT_SESSION_ID}',
        cancel_url=settings.SITE_URL + '/?canceled=true',
    )
    return redirect(checkout_session.url)


@api_view(['POST'])
@permission_classes((AllowAny,))
@csrf_exempt
def stripe_webhook(request):
    # Retrieve the raw request data from Stripe
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']

    # Verify the event signature
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    
    except ValueError as e:
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        return HttpResponse(status=400)

    # Handle the payment_intent.succeeded event
    if event['type'] == 'payment_intent.succeeded':
        payment_intent = event['data']['object']
        payment = Payment.objects.create(
            amount=payment_intent.amount,
            payment_status=payment_intent.status,
            currency=payment_intent.currency
        )
        print("============================",payment_intent)
    

    return HttpResponse(status=200)


@api_view(['POST'])
@permission_classes((AllowAny,))
def create_payment(request):
    data = json.loads(request.data)

    # Each payment method type has support for different currencies. In order to
    # support many payment method types and several currencies, this server
    # endpoint accepts both the payment method type and the currency as
    # parameters. To get compatible payment method types, pass
    # `automatic_payment_methods[enabled]=true` and enable types in your dashboard
    # at https://dashboard.stripe.com/settings/payment_methods.

    # Some example payment method types include `card`, `ideal`, and `link`.
    payment_method_type = data['paymentMethodType']
    currency = data['currency']

    # Create a PaymentIntent with the amount, currency, and a payment method type.
    #
    # See the documentation [0] for the full list of supported parameters.
    #
    # [0] https://stripe.com/docs/api/payment_intents/create
    formatted_payment_method_type = ['link', 'card'] if payment_method_type == 'link' else [payment_method_type]
    params = {
        'payment_method_types': formatted_payment_method_type,
        'amount': 5999,
        'currency': currency
    }

    # If this is for an ACSS payment, we add payment_method_options
    # to create the Mandate. This is not required if you're not accepting
    # ACSS (Pre-authorized debit in Canada).
    if payment_method_type == 'acss_debit':
        params['payment_method_options'] = {
            'acss_debit': {
                'mandate_options': {
                    'payment_schedule': 'sporadic',
                    'transaction_type': 'personal'
                }
            }
        }


    try:
        intent = stripe.PaymentIntent.create(**params)

        # Send PaymentIntent details to the front end.
        return jsonify({'clientSecret': intent.client_secret})
    except stripe.error.StripeError as e:
        return jsonify({'error': {'message': str(e)}}), 400
    except Exception as e:
        return jsonify({'error': {'message': str(e)}}), 400
    

@api_view(['GET'])
@permission_classes((AllowAny,))
def get_config(request):
    publishable_key = settings.STRIPE_PUBLISHABLE_KEY
    return JsonResponse({'publishableKey': publishable_key})