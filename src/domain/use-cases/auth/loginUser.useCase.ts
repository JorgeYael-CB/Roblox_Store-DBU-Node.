import { LoginUserDto } from "../../dtos/auth/loginUser.dto";
import { AuthRepository } from "../../repositories/auth.repository";




export class LoginUserUsecase{

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly generateJwt: (payload: Object, duration?: string) => Promise<string | null>,
    ){};

    login = async (loginUserDto: LoginUserDto) => {
        const user = await this.authRepository.login(loginUserDto);

        const jwt = await this.generateJwt({
            userId: user.id
        });

        return {
            user: {
                name: user.name,
                buyerAccounts: user.buyerAccounts,
                hasReview: user.hasReview,
                verified: user.verified,
                id: user.id,
                email: user.email,
            },
            jwt,
        }
    };
};