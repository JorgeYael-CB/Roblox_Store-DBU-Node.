import { ValidateData } from "../../../config";

export class RegisterUserDto{


    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ){};

    static create( obj: { [key:string]:any } ):[string?, RegisterUserDto?] {
        const {name, email, password} = obj;


        //* Validaciones
        if( !name ) return ['Missing name'];
        if( name.trim().length < 2 ) return ['name is too short'];

        const [passError, pass] = ValidateData.checkPassword(password);
        const [mailError, mail] = ValidateData.checkEmail(email);

        if( passError || mailError ) return [passError ?? mailError];

        return[undefined, new RegisterUserDto(name.trim(), pass!, mail!)];
    };
};