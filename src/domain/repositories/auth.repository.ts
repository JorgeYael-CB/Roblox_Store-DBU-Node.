import { ForgotPasswordDto, LoginUserDto, RegisterUserDto, ResetPasswordDto } from "../dtos/auth";
import { EditProductDto } from "../dtos/products";
import { AuthUserEntity } from "../entities";



export abstract class AuthRepository{

    abstract login( loginUserDto: LoginUserDto ): Promise<AuthUserEntity>
    abstract register( registerUserDto: RegisterUserDto ): Promise<AuthUserEntity>
    abstract forgotPassword( forgotPasswordDto: ForgotPasswordDto ):Promise<AuthUserEntity>;
    abstract resetPassword( resetPassworDto: ResetPasswordDto, userId: string ):Promise<AuthUserEntity>;
    abstract getUserById( id: string ):Promise<AuthUserEntity>;
    abstract verifyAccount( id: string ):Promise<AuthUserEntity>;
    abstract addAccountPay( obj: {email: string, nameAccount: string} ): Promise<AuthUserEntity>;
    abstract editAccount( editAccount: EditProductDto, userId: string ): Promise<AuthUserEntity>;

}