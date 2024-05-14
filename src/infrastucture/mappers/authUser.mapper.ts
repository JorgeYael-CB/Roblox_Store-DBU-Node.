import { AuthUserEntity } from "../../domain/entities";



export class AuthUserMapper{

    static getUserByObject = ( obj: {[key:string]:any} ):AuthUserEntity => {
        const { name, email, password, id, _id, buyerAccounts, verified, review, hasReview, banned, startsReview } = obj;


        return new AuthUserEntity(name, email, password, id || _id, buyerAccounts, verified, review, hasReview, banned, startsReview);
    };

}