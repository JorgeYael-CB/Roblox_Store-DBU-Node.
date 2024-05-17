import { ProductEntity } from '../../domain/entities/product.entity';




export class ProductMapper{

    static getUserByObject = ( obj: {[key:string]:any} ):ProductEntity => {
        const {amountDiscount, available, category, description, discount, name, price, urlImage, id, _id} = obj;


        return new ProductEntity(name, price, available, description, discount, amountDiscount, category, urlImage, id || _id);
    };

}