import { MailerAdapter } from "../../../config";
import { ResetPasswordDto } from "../../dtos/auth";
import { CustomError } from "../../errors";
import { AuthRepository } from "../../repositories/auth.repository";


export class ResetPasswordUsecase{

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly validateJwt: <T>(token: string) => Promise<T | null>,
        private readonly mailerService: MailerAdapter,
    ){};


    async reset( resetPasswordDto: ResetPasswordDto, jwt:string ){
        const token = await this.validateJwt<{userId: string}>(jwt);
        if( !token ) throw CustomError.unauthorized('Oops! An error has occurred, please try again later.');

        const {userId} = token;

        const user = await this.authRepository.resetPassword(resetPasswordDto, userId);

        //* Notificamos al usuario que se cambio su contraseña
        this.mailerService.send({
            html: `
                <h1>Hi "${user.name}", your password has been changed successfully.</h1>
                <p>This message is sent to confirm that you changed the password, if you did not change it, contact support</p>
            `,
            subject: `DevComplete Studios`,
            to: user.email,
        });
    }
}