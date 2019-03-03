import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

salesByProduct;
revenue;
sales;
  constructor() { }

  ngOnInit() {
  }

}