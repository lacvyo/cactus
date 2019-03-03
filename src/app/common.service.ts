import { Injectable } from '@angular/core';
import {Http,Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class CommonService {

  constructor(private http: Http) { }

  GetCount(data: string){
   
    return this.http.get(`http://localhost:8080/getcount/:${data}`)
            .map((response: Response) => response.json())
  }


  GetData(data: any){
    console.log(data)
    return this.http.get(`http://localhost:8080/getposts/:${data}`)
            .map((response: Response) => response.json())
  
  }


  OrderPrice(data: number){
    console.log(data)
    return this.http.get(`http://localhost:8080/getorderprice/:${data}`)
            .map((response: Response) => response.json())
  
  }

  SearchData(data: string){
    console.log(data)
    return this.http.get(`http://localhost:8080/getsearch/:${data}`)
            .map((response: Response) => response.json())
  
  }

  InsertCart(){
    var data = "Testing"
    console.log(data)
  
    this.http.post(`http://localhost:8080/postdata`, data)
    
  }

  addProductQuery(data: any){

    console.log(data)  
    this.http.post('http://localhost:8080/addProductQ', data).subscribe(
     () => {}, 
     err => console.error(err)
    ); 
  
  }

  editInfo(data: number){

    console.log(data)  
    return this.http.get(`http://localhost:8080/getEditInfo/:${data}`)
    .map((response: Response) => response.json())

  }

  editInfoCategory(data: number){

    console.log(data)  
    return this.http.get(`http://localhost:8080/getEditInfoCategory/:${data}`)
    .map((response: Response) => response.json())

  }

  editProduct(data:any){

    console.log(data)  
    this.http.post('http://localhost:8080/editProducts', data).subscribe(
     () => {}, 
     err => console.error(err)
    ); 


  }
  //Josean Begin
  LogInVerification(data: any) {
    return this.http.post('http://localhost:8080/login', data)
    .map( (response: Response) => response.json());
  }

  RegisterUser(data: any) {
    return this.http.post(`http://localhost:8080/registerUser`, data)
    .map( (response: Response) => response.json());
  }
  RegisterUserAdmin(data: any) {
    return this.http.post(`http://localhost:8080/registerUserAdmin`, data)
    .map( (response: Response) => response.json());
  }
  GetUserInformation(data: any) {
    return this.http.post (`http://localhost:8080/getUserInformation`, data)
    .map ((response: Response)=> response.json() )
  }

  UpdateUserInformation(data: any) {
    return this.http.post(`http://localhost:8080/updateUserInformation`, data)
    .map((response: Response)=> response.json() );
  }
  GetUserAddress(data: any) {
    return this.http.post (`http://localhost:8080/getUserAddress`, data)
    .map ((response: Response)=> response.json() )
  }
  UpdateUserAddress(data: any) {
    return this.http.post(`http://localhost:8080/updateUserAddress`, data)
    .map((response: Response)=> response.json() );
  }
  //Josean End
prueba(){
   
  return this.http.get(`http://localhost:8080/prueba`)
          .map((response: Response) => response.json())
}


getAllProducts()
{
  return this.http.get('http://localhost:8080/getallproducts/')
  .map((response: Response) => response.json())
}

getAllOrders()
{
  return this.http.get('http://localhost:8080/getallorders/')
  .map((response: Response) => response.json())
}

getAllAccounts()
{
  return this.http.get('http://localhost:8080/getallaccounts/')
  .map((response: Response) => response.json())
}



Payment(data: any){

  console.log(data)  
  this.http.post('http://localhost:8080/payment', data).subscribe(
   () => {}, 
   err => console.error(err)
  ); 
}


GetOrders(data: any){
  return this.http.get(`http://localhost:8080/getorders/:${data}`)
          .map((response: Response) => response.json())
}

GetProduct(data: any){
  return this.http.get(`http://localhost:8080/getproduct/:${data}`)
          .map((response: Response) => response.json())
}

GetShippingAddress(data: any){
  return this.http.get(`http://localhost:8080/getshippingaddress/:${data}`)
  .map((response: Response) => response.json())
}


PostShippingAddress(data){
  return this.http.post(`http://localhost:8080/postshippingaddress`,data).subscribe(
    () => {}, 
    err => console.error(err)
   ); 
}


salesByProducts(data:any)
{
  return this.http.post(`http://localhost:8080/salesByProduct`, data)
  .map((response: Response) => response.json())
}
salesReport(data:any)
{
  return this.http.post(`http://localhost:8080/salesReport`, data)
  .map((response: Response) => response.json())
}
revenueReports(data:any)
{
  return this.http.post(`http://localhost:8080/revenueReport`, data)
  .map((response: Response) => response.json())
}
statusUpdates(data:any)
{
  return this.http.post(`http://localhost:8080/statusUpdate`, data)
  .map((response: Response) => response.json())
}


}
