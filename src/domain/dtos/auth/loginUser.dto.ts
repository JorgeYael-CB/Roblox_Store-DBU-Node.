import { ValidateData } from "../../../config";

export class LoginUserDto{

    constructor(
        public readonly password: string,
        public readonly email: string,
    ){};

    static create( obj: { [key:string]:any } ):[string?, LoginUserDto?] {
        const {password, email} = obj;


        //* Validaciones
        const [passError, pass] = ValidateData.checkPassword(password);
        const [mailError, mail] = ValidateData.checkEmail(email);

        if( passError || mailError ) return [passError ?? mailError];

        return[undefined, new LoginUserDto(pass!, mail!)];
    };
}