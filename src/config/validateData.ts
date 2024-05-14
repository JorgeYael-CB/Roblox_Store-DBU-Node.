export class ValidateData{

    static checkPassword(password: string):[string?, string?]{
        if( !password ) return ['Missing password'];

        const checkPass = password.trim();

        if( checkPass.length < 6 ) return ['password is too short'];
        if( checkPass.length > 50 ) return ['password is too long'];
        if( checkPass.includes(' ') ) return ['password is not valid!'];

        return [undefined, password];
    };

    static checkEmail(email:string):[string?, string?]{
        if( !email ) return ['Missing email'];

        const emailCheck = email.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if( !emailRegex.test(emailCheck) ) return ['email is not valid'];
        if( emailCheck.length > 100 ) return ['email is too long!'];

        return [undefined, emailCheck];
    }
};