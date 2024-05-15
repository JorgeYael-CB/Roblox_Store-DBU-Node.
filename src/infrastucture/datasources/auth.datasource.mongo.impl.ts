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
    ){}


    async verifyAccount(id: string): Promise<AuthUserEntity> {
        //* Verificamos que el usuario exista
        const user = await AuthUserModel.findById(id);
        if( !user ) throw CustomError.unauthorized('User not exist');

        if( user.verified ) throw CustomError.unauthorized('user already verify!');

        user.verified = true;

        await user.save();

        return AuthUserMapper.getUserByObject(user);
    };


    async getUserById(id: string): Promise<AuthUserEntity> {
        const user = await AuthUserModel.findById(id);
        if( !user ) throw CustomError.unauthorized('user not exist');

        const userVerify = user.verified;
        if( !userVerify ) throw CustomError.unauthorized('verify your account.');

        return AuthUserMapper.getUserByObject(user);
    }

    async forgotPassword(forgoPasswordDto: ForgotPasswordDto): Promise<AuthUserEntity> {
        //* Verificamos que el usuario exista
        const user = await AuthUserModel.findOne({email: forgoPasswordDto.email});
        if( !user ) throw CustomError.unauthorized('User not exist');

        //* Verificamos que este verificado
        const userVerify = user.verified;
        if( !userVerify ) throw CustomError.unauthorized('verify your account.');

        return AuthUserMapper.getUserByObject(user);
    };

    async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<AuthUserEntity> {
        //* Verificamos que el usuario exista
        const user = await AuthUserModel.findOne({email: resetPasswordDto.email});
        if( !user ) throw CustomError.unauthorized('user not exist');

        //* Verificamos que este verificado
        const userVerify = user.verified;
        if( !userVerify ) throw CustomError.unauthorized('verify your account.');

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

        const userVerify = user.verified;
        if( !userVerify ) throw CustomError.unauthorized('verify your account.');

        const userBanned = user.banned;
        if( userBanned ) throw CustomError.unauthorized('Oops!, the user is banned, if you think it is due to an error you can contact support.');

        return AuthUserMapper.getUserByObject(user);
    };

    async register(registerUserDto: RegisterUserDto): Promise<AuthUserEntity> {
        //* Verificar que el usuario no exista pero si no esta verificado enviarle un email para verificar su cuenta
        const user = await AuthUserModel.findOne({email: registerUserDto.email});
        if( user && user.verified ) throw CustomError.unauthorized('User already exist!');

        let newUser

        if( !user ){
            //* Generar su password encryptada
            const passwordHash = this.bcryptHash(registerUserDto.password);

            //* Crear al nuevo usuario en la base de datos
            newUser = await AuthUserModel.create({
                banned: false,
                email: registerUserDto.email,
                buyerAccounts: [],
                password: passwordHash,
                verified: false,
                name: registerUserDto.name,
            });

            await newUser.save();
        } else {
            newUser = user;
        }


        //* Retornar al nuevo usuario
        return AuthUserMapper.getUserByObject(newUser);
    };
}