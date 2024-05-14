import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { LoginUserDto } from "../../domain/dtos/auth/loginUser.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/registerUser.dto";
import { AuthUserEntity } from "../../domain/entities";
import { AuthRepository } from "../../domain/repositories/auth.repository";

export class AuthRepositoryImpl implements AuthRepository {

    constructor(
        private readonly authDatasource: AuthDatasource,
    ){};

    async login(loginUserDto: LoginUserDto): Promise<AuthUserEntity> {
        return await this.authDatasource.login(loginUserDto);
    };

    async register(registerUserDto: RegisterUserDto): Promise<AuthUserEntity> {
        return await this.authDatasource.register(registerUserDto);
    };
}