export class RegisterUserDto{


    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
    ){};

    static create( obj: { [key:string]:any } ):[string?, RegisterUserDto?] {
        const {name, email, password} = obj;


        //* Validaciones


        return[];
    };
};