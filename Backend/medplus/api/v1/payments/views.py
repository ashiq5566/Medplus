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

