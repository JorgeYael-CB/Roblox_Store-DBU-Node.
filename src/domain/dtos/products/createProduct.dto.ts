
interface Props{
    name:string,
    price:number,
    available:boolean,
    description:string,
    discount:boolean,
    amountDiscount?:number,
    category:string,
    urlImage:string,
}


export class CreateProductDto{

    //* DI
    constructor(
        public config: Props,
    ){};


    static create = ( obj: { [key:string]:any } ): [string?, CreateProductDto?] => {
        const categories = ['BASIC', 'PREMIUM', 'NORMAL'];
        const {name, price, available, description, discount, amountDiscount = 0, category, urlImage} = obj;


        if( !name ) return['Missing name'];
        if( !price ) return['Missing price']
        if( isNaN(Number(price)) || Number(price) < 0 ) return ['price is not valid, price is number'];

        if( !available ) return['Missing available'];
        if( typeof !!available !== 'boolean' ) return ['available is not valid, it should be boolean'];

        if( !description ) return['Missing description'];
        if( description.lentgth < 5 ) return ['description is too short'];

        if( !discount ) return['Missing discount'];
        if( typeof !!discount !== 'boolean' ) return ['discount is not valid, it should be boolean'];


        if( !amountDiscount ) return['Missing amountDiscount'];
        if( amountDiscount && (isNaN(Number(amountDiscount)) || Number(amountDiscount) >= 0) ) return ['amountDiscount is not valid, must be a number greater than zero'];


        if( !category ) return['Missing category'];
        if( !categories.includes( category.toUpperCase() ) ) return [`category is not valid, accepted: ${categories}`];

        if( !urlImage ) return['Missing urlImage'];


        return[
            undefined,
            new CreateProductDto({
            amountDiscount: Number(amountDiscount),
            available: !!available,
            category,
            description,
            discount: !!discount,
            name,
            price: Number(price),
            urlImage,
        })];
    }
}