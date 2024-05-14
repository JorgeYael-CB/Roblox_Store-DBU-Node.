import { envs } from "../../config";


export class CustomError extends Error{

    constructor( public readonly message: string, public readonly level: number ){
        super(message)
    };


    static badRequest( message: string ){
        return new CustomError( message, 404 );
    }


    static unauthorized( message: string ){
        return new CustomError( message, 401 );
    }

    static internalServerError( message: string ){
        //* Llamamos al webhook de discord
        console.log(message);

        return new CustomError('Internal Server Error!', 500 );
    }

}
