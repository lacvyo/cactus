import { Component, OnInit } from '@angular/core';
import {CommonService} from '../common.service'; 
@Component({
  selector: 'app-revenue-report',
  templateUrl: './revenue-report.component.html',
  styleUrls: ['./revenue-report.component.scss']
})
export class RevenueReportComponent implements OnInit {
  revenueReport:any = []

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
  
    this.newService.revenueReports(this.Dates).subscribe(data => this.revenueReport = data) 

    
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