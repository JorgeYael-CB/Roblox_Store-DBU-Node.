import { ValidateData } from "../../../config";

export class ResetPasswordDto{

    constructor(
        public readonly newPassword: string,
    ){};

    static create( obj: {[key:string]: any} ): [string?, ResetPasswordDto?]{
        const { newPassword } = obj;

        const [passError, pass] = ValidateData.checkPassword(newPassword, 'newPassword');
        if( passError ) return [passError];

        return [undefined, new ResetPasswordDto(pass!)];
    };

}