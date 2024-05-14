import { Request, Response } from "express";
import { LoginUserDto } from "../../domain/dtos/auth/loginUser.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/registerUser.dto";
import { RegisterUserUsecase } from "../../domain/use-cases/auth";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { CustomError } from "../../domain/errors";
import { LoginUserUsecase } from "../../domain/use-cases/auth/loginUser.useCase";

export class AuthController{

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly generateJwt: (payload: Object, duration?: string | undefined) => Promise<string | null>,
    ){};


    private handleError( error:unknown, res:Response ){
        if( error  instanceof CustomError){
            return res.status(error.level).json({error: error.message});
        }

        console.log(`${error}`) // Winston
        return res.status(500).json({error: 'Internal server error!'});
    };


    loginUser = (req:Request, res:Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if( error ) return res.status(400).json({error});

        const loginUseCase = new LoginUserUsecase(this.authRepository, this.generateJwt)
        loginUseCase.login(loginUserDto!)
            .then( data => res.status(200).json({data}) )
            .catch( err => this.handleError(err, res) );
    };

    registerUser = (req:Request, res:Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if( error ) return res.status(400).json({error});

        const registerUseCase = new RegisterUserUsecase(this.authRepository, this.generateJwt);
        registerUseCase.register(registerUserDto!)
            .then( data => res.status(200).json({data}) )
            .catch( error => this.handleError(error, res) );
    }
}