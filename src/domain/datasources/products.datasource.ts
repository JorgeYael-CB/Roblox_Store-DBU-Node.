import { CreateProductDto } from "../dtos/products";
import { ProductEntity } from "../entities/product.entity";


export abstract class ProductsDatasource{
    abstract createProduct(product: CreateProductDto): Promise<ProductEntity>;
    abstract getUserByName(name: string): Promise<ProductEntity>;
    abstract getProducts(): Promise<ProductEntity[]>
}