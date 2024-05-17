import { CustomError } from "../../errors";
import { AuthRepository } from "../../repositories/auth.repository";



export class GetUserByTokenUsecase{

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly generateJwt: (payload: Object, duration?: string) => Promise<string | null>,
        private readonly validateJwt: <T>(token: string) => Promise<T | null>,
    ){};

    async getUser( jwtCheck:string ){
        const token = await this.validateJwt<{userId: string}>(jwtCheck);
        if( !token ) throw CustomError.unauthorized('Oops! An error has occurred, please try again later.');

        const id = token.userId;
        const user = await this.authRepository.getUserById(id);

        //* Generamos un nuevo JWT
        const jwt = await this.generateJwt({
            userId: user.id
        }, '1h')

        return {
            user: {
                email: user.email,
                name: user.name,
                hasReview: user.hasReview,
                buyerAccounts: user.buyerAccounts,
                verified: user.verified,
            },
            jwt,
        }
    }
}