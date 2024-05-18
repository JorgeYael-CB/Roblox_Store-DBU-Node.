export class EditProductDto{

    constructor(
        public readonly newProductName: string,
        public readonly previusProductName: string,
        public readonly token: string,
    ){};


    static create( obj: {[key:string]: any} ):[string?, EditProductDto?]{
        const {newProductName, previusProductName, token} = obj;

        if( !newProductName ) return ['Missing newProductName'];
        if( !token ) return ['Missing token'];
        if( !previusProductName ) return ['Missing previusProductName'];

        if( newProductName.length <= 1 ) return ['newProductName is too short'];
        if( newProductName.length >= 80 ) return ['newProductName is too long'];


        return[undefined, new EditProductDto(newProductName, previusProductName, token)];
    };

};