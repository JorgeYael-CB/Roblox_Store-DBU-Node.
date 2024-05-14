import mongoose, {Schema} from "mongoose";


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
    },

    buyerAccounts: {
        type: [String],
        default: [],
    },

    verified: {
        type: Boolean,
        default: false,
    },

    review: {
        type: String,
        default: ''
    },

    startsReview: {
        type: Number,
        default: 0,
    },

    hasReview: {
        type: Boolean,
        default: false,
    },

    banned: {
        type: Boolean,
        default: false,
    }
});


export const AuthUserModel = mongoose.model('User', userSchema);

