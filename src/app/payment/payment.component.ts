import { Component, OnInit, Input  } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CartComponent} from '../cart/cart.component'
import {CommonService} from '../common.service'; 

//falta id de usuario
@Component({
  selector: 'app-home',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  ad:any[];
  address;
  city;
  country;
  state;
  zipcode;
  addressId;
  payment_method;
  shipping_method;

  counter = 0;


  add: any = [] ;
  userID;


  transaction: {name: string, cardNumber: string, expDate: string, secretCode: string} = {name: '', cardNumber: '', expDate: '', secretCode: ''};
  data = JSON.parse(localStorage.getItem('cart2'))
  total = 0
  onOrder(){
    console.log(this.transaction.name+" "+this.transaction.cardNumber+" "+this.transaction.expDate+" "+this.transaction.expDate+" "+this.transaction.secretCode)
  }
  constructor(private newService :CommonService) {  }

  ngOnInit() {

    this.userID = localStorage.getItem('userID')
    this.newService.GetShippingAddress(this.userID).subscribe(data => this.ad = data) 

    let myObj = JSON.parse(localStorage.getItem("cart2"));
    myObj.forEach(element => {
      this.total += element.price * element.qty;
    });
  }


  ngAfterViewInit(){

    this.address = this.ad[0].street_address
    this.city = this.ad[0].city
    this.country = this.ad[0].country
    this.state = this.ad[0].state
    this.zipcode = this.ad[0].zip_code
    this.addressId = this.ad[0].shipping_id

  }

  payment(){
    var user_address= (this.address)
    var user_country= (this.country)
    var user_city= (this.city)
    var user_country= (this.country)
    var user_state= (this.state)
    var user_zipcode= (this.zipcode)
    var user_shippingID = this.addressId
    var user_payment = this.payment_method
    var user_shipping = this.shipping_method

console.log(this.counter)
console.log(user_address)
console.log(user_country)
console.log(user_city)
console.log(user_state)
console.log(user_zipcode)
console.log(user_shippingID)
console.log(user_payment)
console.log(user_shipping)



    let myObj = null;  
    if(this.data != null) {
    this.data.forEach(element => {
   
      // var test: any = [{user_id: 1 ,shipping_method: "mail", status:0, total: 19, product_id: 2, payment_method: "Paypal", order_time: "3:00", order_status:0, quantity: 1, price: 19}, 
      // {user_id: 1 ,shipping_method: "mail", status:0, total: 29, product_id: 3, payment_method: "Mastercard", order_time: "3:30", order_status:0, quantity: 1, price: 29}] ;

      if(myObj == null){
        myObj = [{user_id: this.userID, shipping_method: user_shipping, payment_method: user_payment, total: this.total, product_id: element.id, quantity: element.qty, price: element.price}]
      }
    else{
      myObj.push({user_id: this.userID, shipping_method: user_shipping, payment_method: user_payment, total: this.total, product_id: element.id, quantity: element.qty, price: element.price})
    }
    });
  }

  console.log(myObj)
  var count = 0

    this.ad.forEach(element => {
      
      if(element.street_address == user_address && element.city == user_city && element.country == user_country && element.state == user_state && element.zip_code == user_zipcode){
        count = 1
      }
    });

    console.log("Count: " + count)
    
    var newAddress = {street_address: user_address, country: user_country, city: user_city, state: user_state, zip_code: user_zipcode, User_id: this.userID, active_shipping: 1}
     
    if(count == 0){
      console.log("New Address")

       this.newService.PostShippingAddress(newAddress)
    }

  //  //console.log(myObj)
   this.newService.Payment(myObj)
  localStorage.removeItem("cart2")

  }


  addressData(data){
    
    this.address = this.ad[data].street_address
    this.city = this.ad[data].city 
    this.country = this.ad[data].country
    this.state = this.ad[data].state
    this.zipcode = this.ad[data].zip_code
    this.addressId = this.ad[data].shipping_id

    //console.log(this.ad)
  }



  address_data(data1){console.log(data1);this.address = data1}
  country_data(data){console.log(data); this.country = data }
  city_data(data){console.log(data); this.city = data}
  state_data(data){ console.log(data); this.state = data  }
  zipcode_data(data){console.log(data); this.zipcode = data}
  paymentMethod(data){
    this.payment_method = data
    console.log(data)
  }
  shipping(data){
    this.shipping_method = data
    console.log(data)
  }



}
