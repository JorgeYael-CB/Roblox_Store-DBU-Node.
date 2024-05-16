import mongoose, {Schema} from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },

    price: {
        type: Number,
        required: [true, 'price is required'],
    },

    available:{
        type: Boolean,
        default: true,
    },

    description: {
        type: String,
        required: [true, 'description is required'],
    },

    discount: {
        type: Boolean,
        default: false,
    },

    amountDiscount: {
        type:Number,
        default: 0,
    },

    category: {
        type: String,
        enum: ['BASIC', 'PREMIUM', 'NORMAL'],
        default: 'BASIC',
    }
});

export const ProductModel = mongoose.model('products', productSchema);