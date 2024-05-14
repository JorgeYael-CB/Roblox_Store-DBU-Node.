import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { ForgotPasswordDto, LoginUserDto, RegisterUserDto, ResetPasswordDto } from "../../domain/dtos/auth";
import { AuthUserEntity } from "../../domain/entities";
import { AuthRepository } from "../../domain/repositories/auth.repository";

export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly authDatasource: AuthDatasource,
    ){};


    async getUserById(id: string): Promise<AuthUserEntity> {
        return await this.authDatasource.getUserById(id);
    };

    async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<AuthUserEntity> {
        return await this.authDatasource.forgotPassword(forgotPasswordDto);
    };

    async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<AuthUserEntity> {
        return await this.authDatasource.resetPassword(resetPasswordDto);
    };

    async login(loginUserDto: LoginUserDto): Promise<AuthUserEntity> {
        return await this.authDatasource.login(loginUserDto);
    };

    async register(registerUserDto: RegisterUserDto): Promise<AuthUserEntity> {
        return await this.authDatasource.register(registerUserDto);
    };
}