import { Component, OnInit } from '@angular/core';
import {CommonService} from '../common.service';
@Component({
  selector: 'add_product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  addProduct = {
    productName: '',
    productCategorys: '',
    productMaterial: '',
    productIsTherm: '',
    productPaintCoat: '',
    productTough:'',
    productSize: '',
    productDescription: '',
    productQuantity: '',
    inicialPrice:'',
    productPrice: '',
    messageInCup:'',
    productcolors:'',
    productImage:''
  }
  
  //productName:any;

  
  //event handler for the select element's change event

  onbtn(){

  //var test: any = {name: "Test", color:"black",description: "Matte Black travel Mug", price: 19, img:"thermo.jpg"} ;
  var test: any = {name: this.addProduct.productName , description: this.addProduct.productDescription, quantity:this.addProduct.productQuantity,
                  sizep: this.addProduct.productSize ,initialPrice: this.addProduct.inicialPrice,salePrice: this.addProduct.productPrice,
                  active: '1',message: this.addProduct.messageInCup, color: this.addProduct.productcolors, productCategory: this.addProduct.productCategorys, 
                  image: this.addProduct.productImage, materials: this.addProduct.productMaterial, istherm: this.addProduct.productIsTherm, paintCoat:this.addProduct.productPaintCoat,
                  toughs: this.addProduct.productTough}

                  // name: req.body.product_name, description:req.body.product_description ,  req.body.quantity_availabe,
                  // sizep: req.body.size, initialPrice: req.body.initial_price, salePrice: req.body.sale_price, active: req.body.product_active,
                  // message: req.body.message_in_cup, color: req.body.colors, producCategory: req.body.product_category, image: req.body.img               
   
  this.newService.addProductQuery(test);
 console.log(test);

 this.addProduct.productName ='',
 this.addProduct.productCategorys= '',
 this.addProduct.productMaterial= '',
 this.addProduct.productIsTherm= '',
 this.addProduct.productPaintCoat='',
 this.addProduct.productTough='',
 this.addProduct.productSize='',
 this.addProduct.productDescription='',
 this.addProduct.productQuantity='',
 this.addProduct.inicialPrice='',
 this.addProduct.productPrice='',
 this.addProduct.messageInCup='',
 this.addProduct.productcolors=''
    

  }
  
  selectChangeHandler1(data){
    console.log(data);

  }
  selectChangeHandler2(data) {

    console.log(data);
  }


  onAddProduct(){
    //console.log(JSON.stringify(this.addProduct));
  }


  

  constructor( private newService :CommonService) { }

  ngOnInit() {
    
  }

}
