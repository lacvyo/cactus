import { Component, OnInit, AfterContentChecked, AfterViewInit, QueryList, ElementRef, ViewChildren, HostListener, Renderer2, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import {CommonService} from '../common.service'; 
import { AppComponent } from '../app.component';
import {ActivatedRoute} from "@angular/router"

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements AfterViewInit, OnInit, AfterContentChecked {
  @ViewChildren('pages') pages: QueryList<ElementRef>;
  @ViewChild('next') next: ElementRef;
  @ViewChild('prev') prev: ElementRef;
  test: string;

  shoppingCart = Array();
  products: any = [] ;

  pagination: Array<any> = [];
  activePage: number;
  firstElement: number = null;
  lastElement: number = null;
  nextElements = [];
  nextElementsCounter = 0;
  firstActiveElement = null;
  category = "normal"

  @HostListener('click', ['$event']) onclick(event: any) {
    this.renderer.addClass(event.target.parentElement.parentElement, 'active');
    this.firstActiveElement = this.pages.find(element => element.nativeElement.classList.contains('active'));
    if (event.target.parentElement.innerText >= 1 || event.target.parentElement.innerText <= 6) {
      this.getFirstAndLastElement(event);

    }
    if (!this.pages.first.nativeElement.classList.contains('active')) {
      this.renderer.removeAttribute(this.prev.nativeElement.firstElementChild, 'disabled');
      this.renderer.removeAttribute(this.next.nativeElement.firstElementChild, 'disabled');
    }
  }


  title = 'Products';
  cat;

  constructor(private router: ActivatedRoute, private renderer: Renderer2, private newService :CommonService) {
  
   }  
  count = 0
  Repdata;  
 

  ngOnInit() {
   this.test = (this.router.snapshot.params['foo']) 
  

   if(this.test == 'Coffee Mugs'){
    this.title = "Coffee Mug's"
    this.cat = "Porcelain"

   }
   else if(this.test == 'Travel Mugs'){
    this.title = "Travel Mug's"
    this.cat = "Travel"
   }
   else {
     this.title = "All Product's"
     this.cat = "All"
   }
  
  
    console.log(this.router.snapshot.params['foo'])
    var getData = "1" + this.cat
   
    this.newService.GetCount(this.cat).subscribe(data => this.count = data) 
    this.newService.GetData(getData).subscribe(data => this.products = data) 
    
    let paginationLength;

    setTimeout(() => {
        paginationLength = Math.ceil(this.count[0].count / 8);
      // Setting up paginators (clickable pages)
      for (let i = 1; i <= paginationLength; i++) {
        this.pagination.push(i);
      }
    }, 1000);


  }

  ngAfterViewInit() {
    this.renderer.setAttribute(this.prev.nativeElement.firstElementChild, 'disabled', 'true');
    setTimeout(() => {
      this.pages.forEach(element => {
        this.nextElements.push(element);
      });
      this.renderer.addClass(this.pages.first.nativeElement, 'active');
      this.firstActiveElement = this.pages.find(element => element.nativeElement.classList.contains('active'));
      this.activePage = this.firstActiveElement.nativeElement.innerText;
    }, 1000);

  }

  ngAfterContentChecked() {
    setTimeout(() => {
      if (this.pages.first.nativeElement.classList.contains('active')) {
        this.renderer.removeAttribute(this.next.nativeElement.firstElementChild, 'disabled');
        this.renderer.setAttribute(this.prev.nativeElement.firstElementChild, 'disabled', 'true');
      }

      if (this.pages.last.nativeElement.classList.contains('active')) {
        this.renderer.removeAttribute(this.prev.nativeElement.firstElementChild, 'disabled');
        this.renderer.setAttribute(this.next.nativeElement.firstElementChild, 'disabled', 'true');
      }
    }, 1000);

  }

  getActivePage(event: any) {
    return this.activePage = event.target.parentElement.innerText;
  }

  getFirstAndLastElement(event: any) {

  }

  getFirstElement(event: any) {

  }

  getLastElement(event: any) {

  }


  clearActive() {
     this.pages.forEach(element => {
      this.renderer.removeClass(element.nativeElement, 'active');
    });
  }

  firstPage() {
    this.clearActive();
    this.renderer.addClass(this.pages.first.nativeElement, 'active');

    this.activePage = this.pages.first.nativeElement.innerText;
    this.firstElement = this.activePage * 6 - 6 + 1;
    this.lastElement = this.activePage * 6;
    console.log(this.activePage);
  }

  lastPage() {
    this.clearActive();
    this.renderer.addClass(this.pages.last.nativeElement, 'active');

    this.activePage = this.pages.last.nativeElement.innerText;
    this.firstElement = this.activePage * 6 - 6 + 1;
    this.lastElement = this.activePage * 6;

    console.log(this.activePage);
  }

  nextPage(event: any) {

    this.renderer.removeAttribute(this.prev.nativeElement.firstElementChild, 'disabled');
    try {
      if (this.firstActiveElement) {
        // Finds first active element (with class .active)
        this.firstActiveElement = this.pages.find(element => element.nativeElement.classList.contains('active'));
        this.activePage = this.firstActiveElement.nativeElement.innerText;
        console.log((+this.activePage + 1));


        var num = +this.activePage + 1
        var test = num.toString() + this.cat
      console.log(test)
        this.newService.GetData(test).subscribe(data => this.products = data) 
        if(this.category == "orderByPrice"){
          this.newService.OrderPrice(+this.activePage + 1).subscribe(data => this.products = data) 
        }


        //window.location.reload();
        this.firstElement = (+this.activePage + 1) * 6 - 6 + 1;
        this.lastElement = (+this.activePage + 1) * 6;
      }
    } catch (error) {

    }

    if (this.firstActiveElement != undefined) {
      this.renderer.removeClass(this.firstActiveElement.nativeElement, 'active');
      this.renderer.addClass(this.firstActiveElement.nativeElement.nextElementSibling, 'active');
    } else {
      if (this.nextElements[0].nativeElement.classList.contains('active')) {
        this.renderer.removeClass(this.nextElements[0].nativeElement, 'active');
      }
      if (this.nextElements[0] === undefined) {
        this.nextElementsCounter++;
      }
      if (this.nextElementsCounter !== 0) {
        this.renderer.removeClass(this.nextElements[(this.nextElementsCounter - 1)].nativeElement, 'active');
      }
      this.renderer.addClass(this.nextElements[this.nextElementsCounter++].nativeElement, 'active');

      try {
        this.activePage = +this.pages.first.nativeElement.innerText;
        this.firstElement = this.activePage * 6 - 6 + 1;
        this.lastElement = this.activePage * 6;
      } catch (error) {
      }
    }

  }

  prevPage(event: any) {
    this.renderer.removeAttribute(this.next.nativeElement.firstElementChild, 'disabled');
    this.renderer.removeClass(this.firstActiveElement.nativeElement, 'active');
    this.renderer.addClass(this.firstActiveElement.nativeElement.previousElementSibling, 'active');
    this.activePage = +this.firstActiveElement.nativeElement.innerText - 1;
    console.log((+this.activePage ));

    var num = this.activePage 
    var test = num.toString() + this.cat

    this.newService.GetData(test).subscribe(data => this.products = data) 
    if(this.category == "orderByPrice"){
      this.newService.OrderPrice(+this.activePage).subscribe(data => this.products = data) 
    }
    this.firstElement = (+this.activePage) * 6 - 6 + 1;
    this.lastElement = (+this.activePage) * 6;
  }



showData()
{  
  //localStorage.clear()
  //this.newService.GetData(2).subscribe(data => this.products = data) 
  var test: any = [{user_id: 1 ,shipping_method: "mail", status:0, total: 19, product_id: 2, payment_method: "Paypal", order_time: "3:00", order_status:0, quantity: 1, price: 19}, 
                   {user_id: 1 ,shipping_method: "mail", status:0, total: 29, product_id: 3, payment_method: "Mastercard", order_time: "3:30", order_status:0, quantity: 1, price: 29}] ;
  
  //this.newService.Payment(test)
  //this.newService.InsertCart(test)
  //window.location.reload();

   this.products.forEach(element => {
    console.log(element)
  });
// console.log("Shopping Cart")
//   let item = JSON.parse(localStorage.getItem("cart2"));
//   item.forEach(element => {
//     console.log("ID: " + element.id + "\t" + "Name: " +  element.name + "\t" +  "Color: "+ element.color + "\t" + "Price: " + element.price + "\t" + "img: " + element.img + "\t" + "qty: "+element.qty + "\t" + "Amt: " + element.amount)
//   });

  console.log("--------")
}


addToCart(id: string, name: string, color: string, price: string, img: string) {
  
  let myObj
  let check = false;
  if(localStorage.getItem('cart2') == null){
    myObj = [{id: id, name: name, color: color, price: price, img: img, qty: 1, amount: price}]

    localStorage.removeItem("cart2")
    localStorage.setItem("cart2", JSON.stringify(myObj));
    check = true
  }
  else{
    JSON.parse(localStorage.getItem('cart2')).forEach(element => {
      if(element.id == id){
        check = true;
        stop()
      }
    });
  }
  
  if(check == false){
    myObj = JSON.parse(localStorage.getItem('cart2'));
    myObj.push({id: id, name: name, color: color, price: price, img: img, qty: 1, amount: price})

    localStorage.removeItem("cart2")
    localStorage.setItem("cart2", JSON.stringify(myObj));
  }  
}

pushData(){

  this.Repdata.forEach(element => {
    console.log(element.title)
  });
}

orderBy(category){
  var data 
  if(category == 1){

    data = "1" +"1" + this.cat;
    console.log(data)
    this.newService.OrderPrice(data).subscribe(data => this.products = data) 
    this.category = "orderByPrice"
    this.title = "Product's by Price";
  }
  else if (category == 2){
    data = "1" + "2"+ this.cat;
    console.log(data)
    this.newService.OrderPrice(data).subscribe(data => this.products = data) 
    this.category = "orderByPrice"
    this.title = "Product's by Price";
  }
  else if (category == 3){
    data = "1" + "3"+ this.cat;
    console.log(data)
    this.newService.OrderPrice(data).subscribe(data => this.products = data) 
    this.category = "orderByPrice"
    this.title = "Product's by Name A - Z";
  }
  else if (category == 4){
    data = "1" + "4"+ this.cat;
    console.log(data)
    this.newService.OrderPrice(data).subscribe(data => this.products = data) 
    this.category = "orderByPrice"
    this.title = "Product's by Name Z - A";
  }
  else if (category == 6){
    data = "1" + "6"+ this.cat;
    console.log(data)
    this.newService.OrderPrice(data).subscribe(data => this.products = data) 
    this.category = "orderByPrice"
    this.title = "Product's By Size";
  }
  else if (category == 7){
    data = "1" + "7"+ this.cat;
    console.log(data)
    this.newService.OrderPrice(data).subscribe(data => this.products = data) 
    this.category = "orderByPrice"
    this.title = "Product's By Size";
  }
  else if (category == 8){
    data = "1" + "8"+ this.cat;
    console.log(data)
    this.newService.OrderPrice(data).subscribe(data => this.products = data) 
    this.category = "orderByPrice"
    this.title = "Product's By Size";
  }

  //falta los otros campos
}


onEnter(value: string) { 
  //console.log(value) 
  this.newService.SearchData(value).subscribe(data => this.products = data) 
  this.title = "Product's Searched";
}

}



