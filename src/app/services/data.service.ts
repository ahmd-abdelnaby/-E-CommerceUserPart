import { Injectable } from '@angular/core';

import { ICart } from '../Shared Classes and types/icart';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private initCart:ICart;
  private cart=new BehaviorSubject<string>('this.initCart');
  cartObs=this.cart.asObservable();

  private MessageSource=new BehaviorSubject<string>('this is source');
  telecast=this.MessageSource.asObservable();
  message: string;
  constructor() { }

  editMsg(newMsg)
  {
    this.MessageSource.next(newMsg);
  }
  setMessage(data)
  {
    this.message=data;
  }
  getMessage()
  {
    return this.message;
  }
  cartItems(cartt)
  {
    console.log('serrvice here');
    this.cart.next(cartt);
    console.log(`after service${cartt}`);
  }
}
