import { Component, OnInit, AnimationKeyframesSequenceMetadata } from '@angular/core';
import {CommonService} from '../common.service';
@Component({
  selector: 'manage_products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {

  allProduct: any = [];


    compare(a,b) {
      if (a.productName < b.productName)
        return -1;
      if (a.productName > b.productName)
        return 1;
      return 0;
    }
  onSortName() {
    this.allProduct= this.allProduct.sort( (a,b)=>{
      if (a.productName < b.productName)
        return -1;
      if (a.productName > b.productName)
        return 1;
      return 0;
    });
  }
  onSortId() {
    this.allProduct= this.allProduct.sort( (a,b)=>{
      if (a.id < b.id)
        return -1;
      if (a.id > b.id)
        return 1;
      return 0;
    });
  }

  constructor(private newService :CommonService) {

   
    this.newService.getAllProducts().subscribe(data => this.allProduct = data)
    
  }

  ngOnInit() {


  }

}
