import { ValidateData } from "../../../config";

export class ResetPasswordDto{

    constructor(
        public readonly email: string,
        public readonly newPassword: string,
    ){};

    static create( obj: {[key:string]: any} ): [string?, ResetPasswordDto?]{
        const { email, newPassword } = obj;

        const [mailError, mail] = ValidateData.checkEmail(email);
        const [passError, pass] = ValidateData.checkPassword(newPassword, 'newPassword');

        if( mailError || passError ) return [mailError ?? passError];

        return [undefined, new ResetPasswordDto(mail!, pass!)];
    };

}