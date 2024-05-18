import { EditProductDto } from "../../dtos/products";
import { CustomError } from "../../errors";
import { AuthRepository } from "../../repositories/auth.repository";



export class EditProductUsecase{

    constructor(
        private readonly validateToken: <T>(token: string) => Promise<T | null>,
        private readonly authRepositoru: AuthRepository,
    ){};


    edit = async(editProductDto: EditProductDto, token: string) => {
        const validateJwt = await this.validateToken<{userId: string}>(token);
        if( !validateJwt ) throw CustomError.unauthorized('Oops! An error has occurred, please try again later.');

        const {userId} = validateJwt;
        if( !userId ) throw CustomError.unauthorized('Oops! An error has occurred, please try again later.');

        const newProduct = await this.authRepositoru.editAccount(editProductDto, userId);
        return newProduct;
    };
};