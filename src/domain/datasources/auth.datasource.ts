import { ForgotPasswordDto, LoginUserDto, RegisterUserDto, ResetPasswordDto } from "../dtos/auth";
import { AuthUserEntity } from "../entities";



export abstract class AuthDatasource{

    abstract login( loginUserDto: LoginUserDto ): Promise<AuthUserEntity>;
    abstract register( registerUserDto: RegisterUserDto ): Promise<AuthUserEntity>;
    abstract forgotPassword( forgoPasswordDto: ForgotPasswordDto ):Promise<AuthUserEntity>;
    abstract resetPassword( resetPassworDto: ResetPasswordDto ):Promise<AuthUserEntity>;
    abstract getUserById( id: string ):Promise<AuthUserEntity>;
    abstract verifyAccount( id: string ):Promise<AuthUserEntity>;

}