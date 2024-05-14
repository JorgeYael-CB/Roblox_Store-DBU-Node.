import { LoginUserDto } from "../dtos/auth/loginUser.dto";
import { RegisterUserDto } from "../dtos/auth/registerUser.dto";
import { AuthUserEntity } from "../entities";



export abstract class AuthDatasource{

    abstract login( loginUserDto: LoginUserDto ): Promise<AuthUserEntity>
    abstract register( registerUserDto: RegisterUserDto ): Promise<AuthUserEntity>

}