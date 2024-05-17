import Stripe from "stripe";
import { DiscordWebhook, MailerAdapter } from "../../../config";
import { AuthRepository } from "../../repositories/auth.repository";



interface Props{
    data: Stripe.PaymentIntent;
    email: string;
    name: string;
    productName: string;
};


export class WebhookPaymentUsecase{

    constructor(
        private readonly mailerAdapter: MailerAdapter,
        private readonly authRepository: AuthRepository,
        private readonly discordHook: DiscordWebhook,
    ){}


    public webhook = async(dataHook: Props) => {
        //! WEBHOKS
        //* le agregamos cómo comprador al usuario y le agregamos un nuevo usuario con el registro en la base de datos de su array de compras
        const user = await this.authRepository.addAccountPay({
            email: dataHook.email,
            nameAccount: `New Account ${dataHook.name} :D`,
        });


        //* Notificamos al grupo que un usuario ha comprado
        await this.discordHook.notify('Un nuevo usuario se ha registrado', {
            author: {
                name: 'Heisenberg',
            },
            image: {
                url: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHk5cWJjc3U3OHJ1YzVnenMybGJzN3RlZ2JuZjF1ZTllN3EzMzY0NiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YrmJARLfEnu8bXyjFO/giphy.gif'
            },
            title: `Un nuevo usuario ha comprado la cantidad de: $${dataHook.data.amount / 100}`,
        });


        //* Notificamos con un email al usuario que compro
        await this.mailerAdapter.send({
            to: dataHook.email,
            subject: `Purchase Confirmation from DevComplete Studios`,
            html: `
                <h1>Thank you for choosing DevComplete Studios</h1>
                <p>Hi ${dataHook.name},</p>
                <p>This email is to confirm your recent purchase from DevComplete Studios. You have purchased the product: <strong>${dataHook.productName}</strong>.</p>
                <p>The total amount of your purchase is: <strong>${dataHook.data.amount}</strong>.</p>
                <p>If you have any questions or need assistance with your purchase, feel free to contact us.</p>
                <p>Thank you for your support!</p>
                <p>Best regards,</p>
                <p>The DevComplete Studios Team</p>
            `
        });
    };
};