import { CreateProductDto } from "../dtos/products";
import { ProductEntity } from "../entities/product.entity";


export abstract class ProductsRepository{
    abstract createProduct(product: CreateProductDto): Promise<ProductEntity>;
    abstract getUserByName(name: string): Promise<ProductEntity>;
}