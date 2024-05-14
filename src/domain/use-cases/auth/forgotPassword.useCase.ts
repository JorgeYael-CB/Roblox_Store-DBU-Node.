import { MailerAdapter } from "../../../config";
import { ForgotPasswordDto } from "../../dtos/auth";
import { AuthRepository } from "../../repositories/auth.repository";

export class ForgotPassowrdUsecase{

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly mailerService: MailerAdapter,
        private readonly generateJwt: (payload: Object, duration?: string) => Promise<string | null>,
    ){};

    forgot = async (forgotPasswordDto:ForgotPasswordDto, urlRedirect: any) => {
        const user = await this.authRepository.forgotPassword(forgotPasswordDto);


        //* Crear el JWT
        const jwt = await this.generateJwt({
            userId: user.id,
        }, '5m');


        //* Mandar el email
        await this.mailerService.send({
            to: user.email,
            subject: `reset your password in DevComplete Studios.`,
            html: `
                <h1>Hello <strong>${user.name}</strong>, we have sent this message so you can reset your password.</h1>
                <p>You can reset your password by clicking the following link: <strong><a href="${urlRedirect}/${jwt}">Reset</a></strong> </p>
                <p>If you did not request this, you can ignore this message.</p>
                <p>This expires in <strong>5 minutes</strong> .</p>
            `,
        });
    };

}