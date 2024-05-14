import { Request, Response } from "express";
import { LoginUserDto } from "../../domain/dtos/auth/loginUser.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/registerUser.dto";

export class AuthController{

    constructor(){};


    loginUser = (req:Request, res:Response) => {
        const [error, loginUserDto] = LoginUserDto.create(req.body);
        if( error ) return res.status(400).json({error});

        res.status(200).json(loginUserDto);
    };

    registerUser = (req:Request, res:Response) => {
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        if( error ) return res.status(400).json({error});

        res.status(200).json(registerUserDto);
    }
}