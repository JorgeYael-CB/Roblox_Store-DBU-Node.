import nodemailer, { Transporter } from 'nodemailer';
import { CustomError } from '../domain/errors';


interface Props{
    mailerEmail: string;
    mailerPass: string;
    mailerHost?: string;
}

interface SendMailProps{
    to:string | string[];
    subject:string;
    html:string;
}


export class MailerAdapter{

    private readonly transporter:Transporter;

    constructor(config: Props){
        const {mailerEmail, mailerPass, mailerHost = 'smtp.gmail.com'} = config;

        this.transporter = nodemailer.createTransport({
            host: mailerHost,
            auth: {
                user: mailerEmail,
                pass: mailerPass,
            },
        });
    };

    async send( config: SendMailProps ){
        const {html, subject, to} = config;

        try {
            const info = await this.transporter.sendMail({
                to, subject, html,
            });

            return info;
        } catch (error) {
            throw CustomError.internalServerError(`${error}`);
        }
    }

}