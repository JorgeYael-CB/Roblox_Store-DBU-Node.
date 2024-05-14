export class ValidateData{

    static checkPassword(password: string, passwordMessageAlert: string = 'password'):[string?, string?]{
        if( !password ) return ['Missing password'];

        const checkPass = password.trim();

        if( checkPass.length < 6 ) return [`${passwordMessageAlert} is too short`];
        if( checkPass.length > 50 ) return [`${passwordMessageAlert} is too long`];
        if( checkPass.includes(' ') ) return [`${passwordMessageAlert} is not valid!`];

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