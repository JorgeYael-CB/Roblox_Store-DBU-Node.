import { Request, Response } from "express";
import { ForgotPasswordDto, LoginUserDto, RegisterUserDto, ResetPasswordDto } from "../../domain/dtos/auth";

import { RegisterUserUsecase, ForgotPassowrdUsecase, ResetPasswordUsecase, LoginUserUsecase } from "../../domain/use-cases/auth";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { CustomError } from "../../domain/errors";
import { MailerAdapter } from "../../config";

export class AuthController{

    constructor(
        private readonly authRepository: AuthRepository,
        private readonly generateJwt: (payload: Object, duration?: string | undefined) => Promise<string | null>,
        private readonly mailerService: MailerAdapter,
        private readonly validateJwt: <T>(token: string) => Promise<T | null>,
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
    };

    forgotPassowrd = (req:Request, res:Response) => {
        const [error, forgotPasswordDto] = ForgotPasswordDto.create(req.body);
        if( error ) return res.status(200).json({error});

        const { urlResetPassword } = req.query;

        if( !urlResetPassword ) return res.status(400).json({frontError: 'Missing urlResetPassword in params'});

        const forgotPasswordUseCase = new ForgotPassowrdUsecase(this.authRepository, this.mailerService, this.generateJwt)
        forgotPasswordUseCase.forgot(forgotPasswordDto!, urlResetPassword)
            .then( () => res.status(200).json({message: 'Succes', error: undefined, succes: true}) )
            .catch( err => this.handleError(err, res) );
    };

    resetPassword = (req: Request, res:Response) => {
        const [error, resetPasswordDto] = ResetPasswordDto.create(req.body);
        if( error ) return res.status(200).json({error});

        const { jwt } = req.params;
        const resetPasswordUsecase = new ResetPasswordUsecase(this.authRepository, this.validateJwt, this.mailerService);

        resetPasswordUsecase.reset(resetPasswordDto!, jwt)
            .then( () => res.status(200).json({message: 'Succes', error: undefined, succes: true}) )
            .catch( error => this.handleError(error, res) );
    };
}