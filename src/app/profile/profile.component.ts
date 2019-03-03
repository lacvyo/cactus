import { Component, OnInit, AfterContentChecked, AfterViewInit, QueryList, ElementRef, ViewChildren, HostListener, Renderer2, ViewChild } from '@angular/core';
import {CommonService} from '../common.service'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements  OnInit{

  data: any;
  product_info: any;
  
  userID



  constructor(private renderer: Renderer2, private newService :CommonService) {

  }

  ngOnInit() {
    this.userID = localStorage.getItem('userID')
    this.newService.GetOrders(this.userID).subscribe(data => this.data = data) 
  }


  productInfo(data){

  console.log(data)
   this.newService.GetProduct(data).subscribe(data => this.product_info = data) 
  }

}
