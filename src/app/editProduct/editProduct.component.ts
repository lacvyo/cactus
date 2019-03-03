import {  Component,  OnInit} from '@angular/core';
import {CommonService} from '../common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edit_product',
  templateUrl: './editProduct.component.html',
  styleUrls: ['./editProduct.component.scss']
})
export class EditProductComponent implements OnInit {

  editProducts = {
      productName:'',
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
    
  
  constructor(private newService :CommonService, private router: ActivatedRoute) {



  }

  editP: any = [] ;
  editCat: any = [] ;
  ngOnInit() {
      
    var x = this.router.snapshot.params['id']
    console.log(x)
    this.newService.editInfo(x).subscribe(data => this.editP = data);

    this.newService.editInfoCategory(x).subscribe(data => this.editCat = data);
    //this.onEditProduct()  
    
  }


  // ngAfterViewInit(){

  //   // this.editProducts.productName = this.editP[0].product_name;
  //   // this.editProducts.productCategorys = this.editP[0].product_category;
  //   // this.editProducts.productMaterial = this.editP[0].material;
  //   // this.editProducts.productIsTherm = this.editP[0].therm,
  //   // this.editProducts.productPaintCoat = this.editP[0].paint_coat,
  //   // this.editProducts.productTough = this.editP[0].tough,
  //   // this.editProducts.productSize = this.editP[0].size,
  //   // this.editProducts.productDescription = this.editP[0].product_description,
  //   // this.editProducts.productQuantity = this.editP[0].quantity_availabe,
  //   // this.editProducts.inicialPrice = this.editP[0].initial_price,
  //   // this.editProducts.productPrice = this.editP[0].sale_price,
  //   // this.editProducts.messageInCup = this.editP[0].message_in_cup,
  //   // this.editProducts. productcolors = this.editP[0].colors,
  //   // this.editProducts.productImage = this.editP[0].img
  // }

  onEditProduct() {
   // var a = this.editP[0].product_id;

   var x = this.router.snapshot.params['id']
    var test: any = {id:  x,name: this.editP[0].product_name , description: this.editP[0].product_description, quantity: this.editP[0].quantity_availabe,
      sizep: this.editP[0].size ,initialPrice: this.editP[0].initial_price, salePrice: this.editP[0].sale_price,
      active: this.editP[0].product_active,message: this.editP[0].message_in_cup, color: this.editP[0].colors, productCategory: this.editP[0].product_category, 
      image: this.editP[0].img, materials: this.editCat[0].material, istherm: this.editCat[0].therm, paintCoat:this.editCat[0].paint_coat,
      toughs: this.editCat[0].tough}

       this.newService.editProduct(test);
    //  console.log(this.editP[0].product_id);
  
  }

 pruebas(){
  
  this.newService.prueba().subscribe(data=>console.log(data))


 }

}

 