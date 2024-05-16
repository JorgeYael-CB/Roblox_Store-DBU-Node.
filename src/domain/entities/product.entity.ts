export class ProductEntity{
    constructor(
        public readonly name: string,
        public readonly price: number,
        public readonly available: boolean,
        public readonly description: string,
        public readonly discount: boolean,
        public readonly amountDiscount: number,
        public readonly category: string,
    ){}
}