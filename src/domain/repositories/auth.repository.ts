import { ForgotPasswordDto, LoginUserDto, RegisterUserDto, ResetPasswordDto } from "../dtos/auth";
import { AuthUserEntity } from "../entities";



export abstract class AuthRepository{

    abstract login( loginUserDto: LoginUserDto ): Promise<AuthUserEntity>
    abstract register( registerUserDto: RegisterUserDto ): Promise<AuthUserEntity>
    abstract forgotPassword( forgotPasswordDto: ForgotPasswordDto ):Promise<AuthUserEntity>;
    abstract resetPassword( resetPasswordDto: ResetPasswordDto ):Promise<AuthUserEntity>;
    abstract getUserById( id: string ):Promise<AuthUserEntity>;

}