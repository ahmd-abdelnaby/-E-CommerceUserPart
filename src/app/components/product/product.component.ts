import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Shared Classes and types/iproduct';
import { ProductSerivce } from 'src/app/services/product-serivce.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ICartItem } from 'src/app/Shared Classes and types/icart-item';
import { ICart } from 'src/app/Shared Classes and types/icart';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  Products:IProduct[];
  cartItem:ICartItem;
  cart:ICart;
  quantity:number;
  sharedMessage:string;
  message:string;
  constructor(private service:ProductSerivce,private dialog: MatDialog,private sharedData:DataService) {
    this.cart={CartItems:[],total:0};
    this.quantity=0;
   }

  ngOnInit(): void {
    this.sharedData.telecast.subscribe((message)=>this.searchByName(message));
    this.searchByName(this.message);
    //this.sharedData.telecast.subscribe(message=>this.searchByName(message));
    this.service.getAllProducts().subscribe(
      (res)=>{console.log(res);this.Products=res;},
      (err)=>{console.log(err)}
    );
  }


  searchByName(value)
  {
    console.log("vvvvv"+value);
    if(value=='' || value==null)
    {
      this.service.getAllProducts().subscribe(
        (res)=>{console.log(res);this.Products=res;},
        (err)=>{console.log(err)}
      ); 
    }
    else if(value!='')
    {
    this.service.getProductsByName(value).subscribe(
      (res)=>{console.log(res);this.Products=res;},
      (err)=>{console.log(err)}
    );
    }
  }

  openDialog(image:string) {

    this.dialog.open(ProductDialogComponent, {
      width: '530px',
      height: '600px',
      data: {
        dataKey: image
      }
    });
}
AddToCart(id,qua)
{
  this.cartItem={product:{CategoryID:0,ID:0,Img:'',Name:'',Price:0,Quantity:0},quantity:0};
  this.service.getProductById(id).subscribe(
    (res) => {
      this.cartItem.product=res;
      this.cartItem.quantity=qua;
      this.cart.CartItems.push(this.cartItem);
      localStorage.setItem('cart',JSON.stringify(this.cart));
      console.log(localStorage.getItem('cart'));
    },
    (err) => {
      console.log(err);
    }
  );
   
}

}
