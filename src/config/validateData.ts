export class ValidateData{

    static checkPassword(password: string):[string?, string?]{
        const checkPass = password.trim();

        if( !checkPass ) return ['Missing password'];
        if( checkPass.length < 6 ) return ['password is too short'];
        if( checkPass.length > 30 ) return ['password is too long'];

        return [undefined, password];
    };

    static checkEmail(email:string):[string?, string?]{
        const emailCheck = email.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if( !emailCheck ) return ['Missing email'];
        if( !emailRegex.test(emailCheck) ) return ['email is not valid'];

        return [undefined, emailCheck];
    }
};