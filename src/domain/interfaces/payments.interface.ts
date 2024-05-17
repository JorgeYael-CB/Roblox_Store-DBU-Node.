import { Request, Response } from "express";

export interface PaymentProps{
    currency: 'usd' | 'mxn' | 'eur';
    productName: string;
    quantity: number;
    amount: number;
    urlSucces: string;
    urlCancel:string;
    description?:string;

    clientEmail: string;
    clientName: string;
};