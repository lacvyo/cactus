import { Component, OnInit } from '@angular/core';
import {CommonService} from '../common.service'; 

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {


  SalesReports:any = []

  
  DateFrom: any;
  DateTo: any;
  Dates: any = {}

  constructor(private newService :CommonService) { 


  }

  ngOnInit() {

  }


  btn0(data1,data2){

    console.log(data1)
    console.log(data2)
    this.Dates={data1:data1,data2:data2}

    //console.log(this.Dates)
  
    this.newService.salesReport(this.Dates).subscribe(data => this.SalesReports = data) 

    
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
