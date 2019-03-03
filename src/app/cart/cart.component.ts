import { Component, OnInit, AfterContentChecked, AfterViewInit, QueryList, ElementRef, ViewChildren, HostListener, Renderer2, ViewChild } from '@angular/core';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements AfterViewInit, OnInit {
  @ViewChildren('pages') pages: QueryList<ElementRef>;
  @ViewChild('next') next: ElementRef;
  @ViewChild('prev') prev: ElementRef;
  

  // data: any = [
  //   { id: 1, name: 'Cactus Coffe', color:"Black", imagesrc: "coffee.jpg", price: 25, images: "thermo.jpg"},
  //   { id: 2, name: 'Kanye Mug', color:"Red", imagesrc: "coffee.jpg", price: 15, images: "coffee.jpg"},
  //   { id: 3, name: 'Die Travel', color:"Black Matte", imagesrc: "coffee.jpg", price: 39, images: "cup.jpg"},
  // ];

  data = JSON.parse(localStorage.getItem('cart2'))
  userID = localStorage.getItem('userID')

  pagination: Array<any> = [];
  activePage: number;
  firstElement: number = null;
  lastElement: number = null;
  nextElements = [];
  nextElementsCounter = 0;
  firstActiveElement = null;
  total = 0;


  constructor(private renderer: Renderer2) {

  }

  ngOnInit() {
    let paginationLength;
  

    setTimeout(() => {
        paginationLength = Math.ceil(this.data.length / 6);
      // Setting up paginators (clickable pages)
      for (let i = 1; i <= paginationLength; i++) {
        this.pagination.push(i);
      }
    }, 1000);
    let myObj = JSON.parse(localStorage.getItem("cart2"));
    myObj.forEach(element => {
      this.total += element.price * element.qty;
    });
  }

  ngAfterViewInit() {

  }


  onKey(event: any) { // without type info
    console.log(event)
  }
amount(event:any){
  console.log(event);
}
  getActivePage(event: any) {
    return this.activePage = event.target.parentElement.innerText;
  }

  getFirstAndLastElement(event: any) {
    this.getFirstElement(event);
    this.getLastElement(event);
  }

  getFirstElement(event: any) {
    return this.firstElement = this.getActivePage(event) * 6 - 6 + 1;
  }

  getLastElement(event: any) {
    return this.lastElement = this.getActivePage(event) * 6;
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
  }

  lastPage() {
    this.clearActive();
    this.renderer.addClass(this.pages.last.nativeElement, 'active');

    this.activePage = this.pages.last.nativeElement.innerText;
    this.firstElement = this.activePage * 6 - 6 + 1;
    this.lastElement = this.activePage * 6;
  }

  nextPage(event: any) {
    this.renderer.removeAttribute(this.prev.nativeElement.firstElementChild, 'disabled');
    try {
      if (this.firstActiveElement) {
        // Finds first active element (with class .active)
        this.firstActiveElement = this.pages.find(element => element.nativeElement.classList.contains('active'));
        this.activePage = this.firstActiveElement.nativeElement.innerText;
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
    this.firstElement = (+this.activePage) * 6 - 6 + 1;
    this.lastElement = (+this.activePage) * 6;
  }

removeItem(id: string){

  let count = 0
  let myObj = JSON.parse(localStorage.getItem("cart2"));

  for(var x = 0; x <= myObj.length; x++ ){
    if(id == myObj[x].id){
      //console.log(count)
      break
    }
    else{
      count = count + 1
    }
  }
  
  console.log(count)
  myObj.splice(count, 1);

    //console.log(myObj);
    localStorage.removeItem("cart2")
    localStorage.setItem("cart2", JSON.stringify(myObj));
    window.location.reload();
  }
  
  
  valueChange(data, id){
    console.log(data)
    console.log(id)
   var count = 0

  let myObj = JSON.parse(localStorage.getItem("cart2"));
  let myObj2
  myObj.forEach(element => {
    if(count == 0 && id == element.id ){
      myObj2 = [{id: element.id, name: element.name, color: element.color, price: element.price, img: element.img, qty: data, amount: (element.price * data)}]
    }
    else if (count == 0){
      myObj2 = [{id: element.id, name: element.name, color: element.color, price: element.price, img: element.img, qty: element.qty, amount: element.price}]
    }
    else if(id == element.id){
      myObj2.push({id: element.id, name: element.name, color: element.color, price: element.price, img: element.img, qty: data, amount: (element.price * data)})
    }else
    {
      myObj2.push({id: element.id, name: element.name, color: element.color, price: element.price, img: element.img, qty: element.qty, amount: element.price })
    }
    count++;
    });
    localStorage.removeItem("cart2")
    localStorage.setItem("cart2", JSON.stringify(myObj2));

    myObj2 = JSON.parse(localStorage.getItem("cart2"));

    this.data = myObj2
    this.total = 0
    myObj2.forEach(element => {
      this.total += element.price * element.qty;
    });
}


}





