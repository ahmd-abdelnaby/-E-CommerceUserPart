import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ICart } from 'src/app/Shared Classes and types/icart';
import { ProductSerivce } from 'src/app/services/product-serivce.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: ICart;
  SubTotal: number;
  EstimatedShipping: number;
  Total: number;
  constructor(private dataService: DataService,private prdSrv:ProductSerivce,private route:Router) {
    (this.SubTotal = 0), (this.EstimatedShipping = 230), (this.Total = 0);
  }

  ngOnInit(): void {
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.cart.CartItems.forEach((item) => {
      this.SubTotal += item.product.Price * item.quantity;
    });
    this.Total = this.SubTotal - this.EstimatedShipping;
    console.log(this.SubTotal);
  }
  remove(id) {
    let index: number;
    this.cart.CartItems.forEach((item) => {
      if (item.product.ID == id) {
        index = this.cart.CartItems.indexOf(item);
      }
    });
    if (index !== -1) {
      this.cart.CartItems.splice(index, 1);
    }
    localStorage.setItem('cart',JSON.stringify(this.cart));

    //window.location.href='/Cart';
  }
  buy()
  {
    for (const item of this.cart.CartItems)
    {

      this.prdSrv.getProductById(item.product.ID).subscribe(
        response => {
             const prd = response ;
             item.product.Quantity=item.product.Quantity-item.quantity;
             item.quantity = prd.Quantity - item.quantity;
             this.prdSrv.updateProduct(item.product, item.product.ID).subscribe(
              res => {console.log('Updated'); },
              err => { console.log(err); }
            );
        },
        // tslint:disable-next-line:no-unused-expression
        err => console.log(err)
      );

    }
    localStorage.removeItem('cart');
    window.location.href='/Cart';
    //this.route.navigateByUrl('/Cart');
  }

}
