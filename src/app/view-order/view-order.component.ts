import { Component, OnInit } from '@angular/core';
import {CommonService} from '../common.service';


@Component({
  selector: 'view_order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

allOrder=[]; 

shippinStatus: any;
oderStatus:any;
 
Status: any = {}

  constructor(private newService :CommonService)
 {
    this.newService.getAllOrders().subscribe(data => this.allOrder = data)
 }




  ngOnInit() {
  }

  updateShippingStatust(data){

    this.shippinStatus = data;

  }
  updateOrderStatust(data){

    this.oderStatus = data;

  }

  selectedStatus(data){

    this.Status={data1:this.shippinStatus,data2:this.oderStatus,id: data}

    console.log(data)
  
    this.newService.statusUpdates(this.Status).subscribe(data => this.Status = data) 



  }
  
  onSortID() {
    this.allOrder = this.allOrder.sort( (a,b)=>{
      if (a.orderId < b.orderId)
        return -1;
      if (a.orderId > b.orderId)
        return 1;
      return 0;
    });
  }

  onSortStatus() {
    this.allOrder = this.allOrder.sort( (a,b)=>{
      if (a.orderStatus < b.orderStatus)
        return -1;
      if (a.orderStatus > b.orderStatus)
        return 1;
      return 0;
    });
  }

  onSortShippingMethod() {
    this.allOrder = this.allOrder.sort( (a,b)=>{
      if (a.shippingMethod < b.shippingMethod)
        return -1;
      if (a.shippingMethod > b.shippingMethod)
        return 1;
      return 0;
    });
  }

  onSortShippingStatus() {
    this.allOrder = this.allOrder.sort( (a,b)=>{
      if (a.shippingStatus < b.shippingStatus)
        return -1;
      if (a.shippingStatus > b.shippingStatus)
        return 1;
      return 0;
    });
  }



}