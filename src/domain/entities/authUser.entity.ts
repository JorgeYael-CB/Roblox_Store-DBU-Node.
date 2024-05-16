export class AuthUserEntity{
    constructor(
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly id: string,
        public readonly buyerAccounts: string[],
        public readonly verified: boolean,
        public readonly review: string,
        public readonly hasReview: boolean,
        public readonly banned: boolean,
        public readonly startsReview: number,
    ){};
}