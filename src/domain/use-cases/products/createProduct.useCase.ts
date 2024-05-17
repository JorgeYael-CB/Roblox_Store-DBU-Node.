import { CreateProductDto } from "../../dtos/products";
import { ProductsRepository } from "../../repositories/products.repository";




export class CreateProductUsecase{

    constructor(
        private readonly repository: ProductsRepository,
    ){};


    async create( product: CreateProductDto ){
        const newProduct = await this.repository.createProduct(product);

        return newProduct;
    }
}