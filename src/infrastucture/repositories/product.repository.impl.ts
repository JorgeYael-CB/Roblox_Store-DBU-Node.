import { ProductsDatasource } from "../../domain/datasources/products.datasource";
import { CreateProductDto } from "../../domain/dtos/products";
import { ProductEntity } from "../../domain/entities/product.entity";
import { ProductsRepository } from "../../domain/repositories/products.repository";


export class ProductRepositoryImpl implements ProductsRepository{

    constructor(
        private readonly productDatasource: ProductsDatasource,
    ){}

    async getUserByName(name: string): Promise<ProductEntity> {
        return await this.productDatasource.getUserByName(name);
    };

    async createProduct(product: CreateProductDto): Promise<ProductEntity> {
        return await this.productDatasource.createProduct(product);
    };

};