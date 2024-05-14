import { ValidateData } from "../../../config";

export class ForgotPasswordDto{


    constructor(
        public readonly email: string,
    ){};

    static create( obj: {[key:string]:any} ):[string?, ForgotPasswordDto?]{
        const {email} = obj;

        const [mailError, mail] = ValidateData.checkEmail(email);
        if( mailError ) return [mailError];

        return [undefined, new ForgotPasswordDto(mail!)];
    }

}