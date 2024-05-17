import { PaymentAdapter } from "../../../config";
import { CustomError } from "../../errors";
import { AuthRepository } from "../../repositories/auth.repository";
import { ProductsRepository } from "../../repositories/products.repository";


interface Props{
    jwt: string,
    urlSucces: any,
    urlCancel: any,
    name: any,
}


export class SoldProductUsecase{

    //* DI
    constructor(
        private readonly productRepository: ProductsRepository,
        private readonly paymentAdapter: PaymentAdapter,
        private readonly authRepository: AuthRepository,
        private readonly validateJwt: <T>(token: string) => Promise<T | null>,
    ){};


    public sold = async (obj: Props) => {
        const {jwt, name, urlCancel, urlSucces} = obj;
        const product = await this.productRepository.getUserByName(name);

        const token = await this.validateJwt<{userId: string}>(jwt);
        if( !token ) throw CustomError.unauthorized('Oops! An error has occurred, please try again later.');
        const {userId} = token;

        const user = await this.authRepository.getUserById(userId);

        //* Creamos el sistema de pago
        const url = await this.paymentAdapter.onPayment({
            amount: product.price,
            clientEmail: user.email,
            clientName: user.name,
            currency: 'usd',
            productName: product.name,
            quantity: 1,
            urlCancel,
            urlSucces,
            description: product.description,
        });

        return {
            error:false,
            succes: true,
            urlPayment: url,
        };
    };
}