import { IProduct } from "./product";

export interface ICartItem extends IProduct {
    qty: number;
}

export interface ICart {
    [prodId: string]: ICartItem;
}
