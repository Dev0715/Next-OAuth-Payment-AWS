"use client";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";

const CheckoutForm = () => {
    const [error, setError] = useState("");

    const elements = useElements();

    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");

    const stripe = useStripe();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/create-payment-intent", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ price }),
                });

                if (!res.ok) {
                    throw new Error(`Failed to fetch data. Status: ${res.status}`);
                }
                const data = await res.json();
                console.log("Data", data);

                setClientSecret(data.secret);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();
    }, [price]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        if (error) {
            console.log("Payment error", error);
            setError(error.message);
        } else {
            console.log("Payment method", paymentMethod);
            setError("");
        }

        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                },
            });

        if (confirmError) {
            console.log(confirmError);
        } else {
            console.log("payment intent", paymentIntent);
            if (paymentIntent.status === "succeeded") {
                setTransactionId(paymentIntent.id);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: "16px",
                            color: "#424770",
                            "::placeholder": {
                                color: "#aab7c4",

                            },

                        },
                        invalid: {
                            color: "#9e2146",
                        },
                    },
                }}
            />

            <button
                className=" btn bg-purple-400 hover:bg-purple-600"
                type="submit"
                disabled={!stripe || !clientSecret}
            >
                Pay
            </button>

            <p className="text-red-500">{error}</p>
            {
                transactionId && (
                    <p className=" text-green-600">Your transaction id: {transactionId}</p>
                )
            }
        </form >
    );

};

export default CheckoutForm;