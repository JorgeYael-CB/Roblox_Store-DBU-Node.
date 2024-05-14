import { AuthUserModel } from "../../data/mongo/models/authUser.model.mongo";
import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { ForgotPasswordDto, LoginUserDto, RegisterUserDto, ResetPasswordDto } from "../../domain/dtos/auth";
import { AuthUserEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors";
import { AuthUserMapper } from "../mappers/authUser.mapper";



export class AuthDatasourceMongoImpl implements AuthDatasource {

    constructor(
        private readonly bcryptHash: (password: string) => string,
        private readonly compareHash: (password: string, hashed: string) => boolean,
    ){};


    async getUserById(id: string): Promise<AuthUserEntity> {
        const user = await AuthUserModel.findById(id);
        if( !user ) throw CustomError.unauthorized('user not exist');

        return AuthUserMapper.getUserByObject(user);
    }

    async forgotPassword(forgoPasswordDto: ForgotPasswordDto): Promise<AuthUserEntity> {
        //* Verificamos que el usuario exista
        const user = await AuthUserModel.findOne({email: forgoPasswordDto.email});
        if( !user ) throw CustomError.unauthorized('User not exist');

        return AuthUserMapper.getUserByObject(user);
    };

    async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<AuthUserEntity> {
        //* Verificamos que el usuario exista
        const user = await AuthUserModel.findOne({email: resetPasswordDto.email});
        if( !user ) throw CustomError.unauthorized('user not exist');


        //* actualizamos a su nueva contraseña (encryptada)
        const newPassword = this.bcryptHash(resetPasswordDto.newPassword);


        //* Guardamos al usuario
        user.password = newPassword;
        await user.save();


        //* retornamos al usuario
        return AuthUserMapper.getUserByObject(user);
    };


    async login(loginUserDto: LoginUserDto): Promise<AuthUserEntity> {
        const user = await AuthUserModel.findOne({email: loginUserDto.email});
        if( !user ) throw CustomError.unauthorized(`User not exist`);

        const passwordCompare = this.compareHash(loginUserDto.password, user.password);
        if( !passwordCompare ) throw CustomError.unauthorized('credentials are not correct');

        const userBanned = user.banned;
        if( userBanned ) throw CustomError.unauthorized('Oops!, the user is banned, if you think it is due to an error you can contact support.');

        return AuthUserMapper.getUserByObject(user);
    };

    async register(registerUserDto: RegisterUserDto): Promise<AuthUserEntity> {
        //* Verificar que el usuario no exista
        const user = await AuthUserModel.findOne({email: registerUserDto.email});
        if( user ) throw CustomError.unauthorized('User already exist!');


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