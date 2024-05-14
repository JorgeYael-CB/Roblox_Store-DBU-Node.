export class LoginUserDto{


    constructor(
        public readonly password: string,
        public readonly email: string,
    ){};

    static create( obj: { [key:string]:any } ):[string?, LoginUserDto?] {
        const {password, email} = obj;


        //* Validaciones


        return[];
    };
}