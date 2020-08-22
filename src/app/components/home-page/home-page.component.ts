import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IProduct } from 'src/app/Shared Classes and types/iproduct';
import { ProductSerivce } from 'src/app/services/product-serivce.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { ICart } from 'src/app/Shared Classes and types/icart';
import { ICartItem } from 'src/app/Shared Classes and types/icart-item';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  Products: IProduct[];
  product:IProduct;
  cart:ICart;
  SharedCart:ICart;
  cartItem:ICartItem;
  public quantity:number;
  constructor(private service: ProductSerivce, private dialog: MatDialog,private dataService:DataService) {
    this.cart={CartItems:[],total:0};
    this.quantity=0;
    //this.cartItem={product:{CategoryID:0,ID:0,Img:'',Name:'',Price:0,Quantity:0},quantity:0}
  }

  ngOnInit(): void {
    this.service.getAllProducts().subscribe(
      (res) => {
        this.Products = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openDialog(image: string) {
    this.dialog.open(ProductDialogComponent, {
      width: '530px',
      height: '600px',
      data: {
        dataKey: image,
      },
    });
  }
  @ViewChild('input') elem: ElementRef;
  inFocus() {
    this.elem.nativeElement.style.border = 'red';
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
  ngAfterViewInit(): void {
    
  }
}
