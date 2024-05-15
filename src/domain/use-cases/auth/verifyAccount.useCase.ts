import { CustomError } from "../../errors";
import { AuthRepository } from "../../repositories/auth.repository";



export class VerifyAccountUsecase{

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly validateJwt: <T>(token: string) => Promise<T | null>,
    ){};

    async verify( token: string ){
        const jwt = await this.validateJwt<{userId: string}>(token);
        if( !jwt ) throw CustomError.unauthorized('token is not valid');

        const {userId} = jwt;
        const user = await this.authRepository.verifyAccount(userId);

        return {
            user: {
                name: user.name,
                email: user.email,
                verify: user.verified,
            }
        }
    };
}