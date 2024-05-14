import mongoose from 'mongoose';
import { CustomError } from '../../domain/errors';


export class MongoDb{
    constructor(
        private readonly URI: string,
    ){};

    connect(){
        try {
            mongoose.connect(this.URI);
            console.log('Mongo Connected');
        } catch (error) {
            console.log('Mongo error');
            CustomError.internalServerError(`${error}`);
        }
    };
};