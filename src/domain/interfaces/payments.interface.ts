

export interface PaymentProps{
    currency: 'usd' | 'mxn' | 'eur' | 'xaf';
    productName: string;
    quantity: number;
    amount: number;
    urlSucces: string;
    urlCancel:string;
    description?:string;

    clientEmail: string;
    clientName: string;
};