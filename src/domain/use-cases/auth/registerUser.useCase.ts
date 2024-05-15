import { MailerAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth/registerUser.dto";
import { AuthRepository } from "../../repositories/auth.repository";

export class RegisterUserUsecase{

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly mailerServive: MailerAdapter,
        private readonly createJwt: (payload: Object, duration?: string) => Promise<string | null>
    ){};


    register = async (registerUserDto: RegisterUserDto, url: any) => {
        const createdUser = await this.authRepository.register(registerUserDto);


        const jwt = await this.createJwt({
            userId: createdUser.id,
        }, '5m');


        //* Mandamos el email de confirmacion
        this.mailerServive.send({
            to: createdUser.email,
            subject: `DevComplete Studios`,
            html: `
                <h1>Hello "${createdUser.name}", verify your account in DevComplete Studios</h1>
                <p> <strong>Verify your account</strong> by entering the following link: <a href="${url}/${jwt}">Verify</a> </p>
            `
        })


        return {
            user: {
                name: createdUser.name,
                buyerAccounts: createdUser.buyerAccounts,
                hasReview: createdUser.hasReview,
                verified: createdUser.verified,
                id: createdUser.id,
                email: createdUser.email,
            },
            message: 'An email has been sent to confirm the account.'
        }
    };
};