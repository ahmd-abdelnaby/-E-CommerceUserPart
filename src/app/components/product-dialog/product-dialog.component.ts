import { Component, OnInit,Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  form: FormGroup;
  description:string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

     
  }

  ngOnInit() {
    
  }




}
