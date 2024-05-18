import { ProductModel } from "../../data/mongo/models/products.model.mongo";
import { ProductsDatasource } from "../../domain/datasources/products.datasource";
import { CreateProductDto } from "../../domain/dtos/products";
import { ProductEntity } from "../../domain/entities/product.entity";
import { CustomError } from "../../domain/errors";
import { ProductMapper } from "../mappers/products.mapper";



export class ProductDatasourceMongoImpl implements ProductsDatasource{

    constructor(){}


    async getProducts(): Promise<ProductEntity[]> {
        const products = await ProductModel.find();
        return products.map( product => ProductMapper.getUserByObject(product));
    }

    async getUserByName(name: string): Promise<ProductEntity> {
        const product = await ProductModel.findOne({name});
        if( !product ) throw CustomError.badRequest(`Product with name: ${name} not found`);

        return ProductMapper.getUserByObject(product);
    };

    async createProduct(product: CreateProductDto): Promise<ProductEntity> {
        //* Verificamos que el producto no exista
        const prevProduct = await ProductModel.findOne({name: product.config.name});
        if( prevProduct ) throw CustomError.unauthorized('Product already exist!');

        const {config: {available, category, description, discount, name, price, urlImage, amountDiscount}} = product;

        //* Creamos el nuevo producto
        const newProduct = await ProductModel.create({
            amountDiscount,
            available,
            category,
            description,
            discount,
            name,
            price,
            urlImage,
        });


        //* Retornamos el nuevo producto
        return ProductMapper.getUserByObject(newProduct);
    };

};