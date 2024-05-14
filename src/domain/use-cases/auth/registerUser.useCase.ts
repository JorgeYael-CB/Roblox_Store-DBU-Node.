import { RegisterUserDto } from "../../dtos/auth/registerUser.dto";
import { AuthRepository } from "../../repositories/auth.repository";

export class RegisterUserUsecase{

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly generateJwt: (payload: Object, duration?: string) => Promise<string | null>,
        // private readonly validateJwt: <T>(token: string) => Promise<T | null>
    ){};


    register = async (registerUserDto: RegisterUserDto) => {
        const createdUser = await this.authRepository.register(registerUserDto);

        const jwt = await this.generateJwt({
            userId: createdUser.id
        });

        return {
            user: {
                name: createdUser.name,
                buyerAccounts: createdUser.buyerAccounts,
                hasReview: createdUser.hasReview,
                verified: createdUser.verified,
                id: createdUser.id,
                email: createdUser.email,
            },
            jwt,
        }
    };
};