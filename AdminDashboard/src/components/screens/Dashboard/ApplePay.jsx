import React, {useEffect, useState} from 'react';
import {PaymentRequestButtonElement, useStripe, useElements} from '@stripe/react-stripe-js';

function ApplePay() {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentRequest, setPaymentRequest] = useState(null);
    // const [messages, addMessage] = useMessages();

    useEffect(() => {
        if (!stripe || !elements) {
        return;
        }

    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: 'Demo total',
        amount: 1999,
      },
      requestPayerName: true,
      requestPayerEmail: true,
    });

    // Check the availability of the Payment Request API.
    pr.canMakePayment().then(result => {
      if (result) {
        setPaymentRequest(pr);
      }
    });

    pr.on('paymentmethod', async (e) => {
      const {error: backendError, clientSecret} = await fetch(
        '/create-payment-intent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentMethodType: 'card',
            currency: 'usd',
          }),
        }
      ).then((r) => r.json());

      if (backendError) {
        // addMessage(backendError.message);
        return;
      }

      // addMessage('Client secret returned');

      const {
        error: stripeError,
        paymentIntent,
      } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: e.paymentMethod.id,
      }, { handleActions: false });

      if (stripeError) {
        // Show error to your customer (e.g., insufficient funds)
        // addMessage(stripeError.message);
        return;
      }
    });
  }, [stripe, elements]);


    return (
        <div>
            <h1>Apple Pay</h1>
            {paymentRequest && <PaymentRequestButtonElement options={{paymentRequest}} />}        
        </div>
    )
}

export default ApplePay
