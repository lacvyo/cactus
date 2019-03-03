import { Component, OnInit } from '@angular/core';
import {CommonService} from '../common.service'; 
@Component({
  selector: 'app-sales-by-product',
  templateUrl: './sales-by-product.component.html',
  styleUrls: ['./sales-by-product.component.scss']
})
export class SalesByProductComponent implements OnInit {

  SalesByProduct:any = [];

  DateFrom: any;
  DateTo: any;
  Dates: any = {}

  constructor(private newService :CommonService) { 


  }

  ngOnInit() {

    
   
    //this.newService.salesByProducts(this.Dates).subscribe(data => this.SalesByProduct = data) 

  }


  btn0(data1,data2){

    console.log(data1)
    console.log(data2)
    this.Dates={data1:data1,data2:data2}

    //console.log(this.Dates)
  
    this.newService.salesByProducts(this.Dates).subscribe(data => this.SalesByProduct = data) 

    
    // var a = this.SalesByProduct.product_id;
    // console.log(a)
  }

  dayto(data){

    this.DateTo = data
    //console.log(data)
  }

  dayFrom(data){

    this.DateFrom = data
    //console.log(data)
  }





}
