import { AuthUserModel } from "../../data/mongo/models/authUser.model.mongo";
import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { LoginUserDto } from "../../domain/dtos/auth/loginUser.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/registerUser.dto";
import { AuthUserEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";
import { AuthUserMapper } from "../mappers/authUser.mapper";



export class AuthDatasourceMongoImpl implements AuthDatasource {


    constructor(
        private readonly bcryptHash: (password: string) => string,
        private readonly compareHash: (password: string, hashed: string) => boolean,
    ){};


    async login(loginUserDto: LoginUserDto): Promise<AuthUserEntity> {
        const user = await AuthUserModel.findOne({email: loginUserDto.email});
        if( !user ) throw CustomError.badRequest(`User not exist`);

        const passwordCompare = this.compareHash(loginUserDto.password, user.password);
        if( !passwordCompare ) throw CustomError.badRequest('credentials are not correct');

        const userBanned = user.banned;
        if( userBanned ) throw CustomError.badRequest('Oops!, the user is banned, if you think it is due to an error you can contact support.');

        return AuthUserMapper.getUserByObject(user);
    };

    async register(registerUserDto: RegisterUserDto): Promise<AuthUserEntity> {
        //* Verificar que el usuario no exista
        const user = await AuthUserModel.findOne({email: registerUserDto.email});
        if( user ) throw CustomError.badRequest('User alreadt exist!');


        //* Generar su password encryptada
        const passwordHash = this.bcryptHash(registerUserDto.password);


        //* Crear al nuevo usuario en la base de datos
        const newUser = await AuthUserModel.create({
            banned: false,
            email: registerUserDto.email,
            buyerAccounts: [],
            password: passwordHash,
            verified: false,
            name: registerUserDto.name,
        });

        await newUser.save();


        //* Retornar al nuevo usuario
        return AuthUserMapper.getUserByObject(newUser);
    };
}