import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./Buy.css";

export default function CheckoutForm({ user, total, products, shippingInfo }) {



  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory()
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function showSucces() {
    const saveOrder = await axios.post('pay/api/checkout/confirm', {
      user, total, products, shippingInfo
    }) 
    return "http://localhost:3000/"
    /*if (saveOrder.data.message = 'Pago exitoso') {
      localStorage.removeItem('cart')
       window.Swal.fire({
        title: 'Compra realizada con éxito!',
        text: "Te llegará la información de la misma a tu casilla de correo",
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Volver al inicio'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            history.push("/")
          )
          return "http://localhost:3000/"
        }
      }) 
      return setTimeout(() => "http://localhost:3000/", 1)
    }*/
  }

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage(t('checkOutForm2.succeeded'));
          break;
        case "processing":
          setMessage(t('checkOutForm2.processing'));
          break;
        case "requires_payment_method":
          setMessage(t('checkOutForm2.requires_payment_method'));
          break;
        default:
          setMessage(t('checkOutForm2.wentWrong'));
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: await showSucces(),
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage(t('checkOutForm2.unexpectedError'));
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : t('checkOutForm2.payNow')}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}
