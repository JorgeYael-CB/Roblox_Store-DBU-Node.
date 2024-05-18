import { Request, Response } from "express";
import { CreateProductDto } from "../../domain/dtos/products";
import { CreateProductUsecase, SoldProductUsecase, WebhookPaymentUsecase } from "../../domain/use-cases/products";
import { ProductsRepository } from "../../domain/repositories/products.repository";
import { CustomError } from "../../domain/errors";
import { DiscordWebhook, MailerAdapter, PaymentAdapter } from "../../config";
import { AuthRepository } from "../../domain/repositories/auth.repository";


export class ProductController{

    //* DI
    constructor(
        private readonly productRepository: ProductsRepository,
        private readonly paymentAdapter: PaymentAdapter,
        private readonly authRepository: AuthRepository,
        private readonly validateJwt: <T>(token: string) => Promise<T | null>,
        private readonly mailerService: MailerAdapter,
        private readonly discordHook: DiscordWebhook,
    ){};


    private handleError( error:unknown, res:Response ){
        if( error  instanceof CustomError){
            return res.status(error.level).json({error: error.message});
        }

        CustomError.internalServerError(`${error}`);
        return res.status(500).json({error: 'Internal server error!'});
    };

    createProduct = (req:Request, res:Response) => {
        const [error, createProductDto] = CreateProductDto.create(req.body);
        if( error ) return res.status(400).json({error});

        const useCase = new CreateProductUsecase(this.productRepository);
        useCase.create(createProductDto!)
            .then( data => res.status(200).json({data}) )
            .catch( err => this.handleError(err, res) );
    };


    soldProduct = (req:Request, res:Response) => {
        const {name, urlCancel, urlSucces} = req.query;
        const {jwt} = req.params;

        if( !name ) return res.status(400).json({error: 'Missing name in queryParams'});
        if( !urlCancel ) return res.status(400).json({error: 'Missing urlCancel in queryParams'});
        if( !urlSucces ) return res.status(400).json({error: 'Missing urlSucces in queryParams'});

        const useCase = new SoldProductUsecase(this.productRepository, this.paymentAdapter, this.authRepository, this.validateJwt)
        useCase.sold({
            jwt,
            name,
            urlCancel,
            urlSucces,
        })
            .then( data => res.status(200).json({data}) )
            .catch( err => this.handleError(err, res) );
    };

    hook = (req:Request, res:Response) => {
        const data = this.paymentAdapter.hook(req, res);
        if( !data || !data.email ) {
            return
        };

        const useCase = new WebhookPaymentUsecase(this.mailerService, this.authRepository, this.discordHook)
        useCase.webhook(data)
            .catch( err => CustomError.internalServerError(`${err}`) );
    };

    getProducts = (req:Request, res:Response) => {
        this.productRepository.getProducts()
            .then( products => res.status(200).json({products}))
            .catch( err => this.handleError(err, res) );
    };
};