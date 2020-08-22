import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../Shared Classes and types/iproduct';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductSerivce {
  
  constructor(private httpClient:HttpClient) { }

  getAllProducts(): Observable<IProduct[]>{
    return this.httpClient.get<IProduct[]>(`${environment.Api_url}/Products`);
  }

  getProductById(id): Observable<IProduct>{
    
        return this.httpClient.get<IProduct>(`${environment.Api_url}/Products/`+id);
  }

  getProductsByName(name): Observable<IProduct[]>{
    const httpOptions = {headers: new HttpHeaders({
      "Authorization": "bearer " + localStorage.getItem('token')
        })};
    return this.httpClient.get<IProduct[]>(`${environment.Api_url}/Products?name=`+name,httpOptions);
  }
  
  updateProduct(prd: IProduct,id){
    const httpOptions = {headers: new HttpHeaders({
      'Content-Type': 'application/json',
      "Authorization": "bearer " + localStorage.getItem('token')
        })};

    return this.httpClient.put(`${environment.Api_url}/Products/`+id, prd, httpOptions);
  }
}
