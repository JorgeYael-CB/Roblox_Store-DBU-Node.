import Stripe from 'stripe';
import { PaymentProps } from '../domain/interfaces';
import { CustomError } from '../domain/errors';
import { Request, Response } from 'express';



export class PaymentAdapter{

    private readonly keyHook:string;
    private readonly stripe: Stripe;
    private userEmail: string = '';
    private userName: string = '';


    constructor( webHookKey: string, apiKey:string){
        this.keyHook = webHookKey;
        this.stripe = new Stripe(apiKey);
    };


    private hook = (req:Request, res:Response) => {
        try {
            const sig = req.headers['stripe-signature'];
            if( !sig ) throw CustomError.badRequest('payment is not valid');

            let event;

            try {
                event = this.stripe.webhooks.constructEvent(req.body, sig, this.keyHook);
            } catch (error) {
                throw CustomError.badRequest(`${error}`);
            }

            // Handle the event
            switch (event.type) {
                case 'payment_intent.succeeded':
                    const paymentIntentSucceeded = event.data.object;
                    const customerEmail = this.userEmail;
                    const customerName = this.userName;

                    return {
                        email: customerEmail,
                        name: customerName,
                        data: paymentIntentSucceeded,
                    };
                default:
                    console.log(`Unhandled event type ${event.type}`);

                res.send();
            };
        } catch (error) {
            throw CustomError.internalServerError(`${error}`);
        }
    };


    onPayment = async( config:PaymentProps ) => {
        try {
            const {amount, clientEmail, currency, productName, quantity, urlCancel, urlSucces, clientName} = config;

            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: currency,
                        product_data: {
                        name: productName,
                        },
                    unit_amount: amount * 100,
                    },
                    quantity,
                }],
                mode: 'payment',
                success_url: urlSucces,
                cancel_url: urlCancel,
                customer_email: clientEmail,
            });

            this.userEmail = clientEmail;
            this.userName = clientName;

            return session.url;
        } catch (error) {
            throw CustomError.internalServerError(`${error}`);
        };
    };

}