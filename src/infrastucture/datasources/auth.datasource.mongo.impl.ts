import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { LoginUserDto } from "../../domain/dtos/auth/loginUser.dto";
import { RegisterUserDto } from "../../domain/dtos/auth/registerUser.dto";
import { AuthUserEntity } from "../../domain/entities";



export class AuthDatasourceMongoImpl implements AuthDatasource {


    constructor(){};


    login(loginUserDto: LoginUserDto): Promise<AuthUserEntity> {
        //* Verificar que el usuario exista


        //* Verificar que la contraseña coincida (bcrypt)


        //* Verificar que no este baneado de la página


        //* Retornar el usuario
        throw new Error("Method not implemented.");
    };

    register(registerUserDto: RegisterUserDto): Promise<AuthUserEntity> {
        //* Verificar que el usuario no exista


        //* Generar su password encryptada


        //* Crear al nuevo usuario en la base de datos


        //* Retornar al nuevo usuario
        throw new Error("Method not implemented.");
    };
}