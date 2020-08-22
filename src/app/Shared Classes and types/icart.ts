import { IProduct } from './iproduct';
import { ICartItem } from './icart-item';

export interface ICart {
    CartItems:ICartItem[];
    total:number;
}
