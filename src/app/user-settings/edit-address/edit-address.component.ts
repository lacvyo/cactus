import {Component, OnInit} from '@angular/core';
import {NgForOf} from '@angular/common';
import { CommonService } from '../../common.service';
@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {
  testVar:any;
  UpdateStatus = "No overrite";
  Address;
  User_id;
  oldAddress;
  onDelete(address, index) {
    var updateAddress= {
      street_number: address.street_number,
      street_address: address.street_address,
      apt_name: address.apt_name,
      city: address.city,
      state: address.state,
      zip_code: address.zip_code,
      User_id: address.User_id,
      active_shipping: 0,
      //Previous Addresses
      pstreet_number: this.oldAddress[index].street_number,
      pstreet_address: this.oldAddress[index].street_address,
      papt_name: this.oldAddress[index].apt_name,
      pcity: this.oldAddress[index].city,
      pstate: this.oldAddress[index].state,
      pzip_code: this.oldAddress[index].zip_code
    }
    console.log(this.UpdateStatus)
    this.newService.UpdateUserAddress(updateAddress).subscribe(data=> this.UpdateStatus = data[0]);
    console.log(this.UpdateStatus)
  }
  onUpdate(address, index) {
    var updateAddress= {
      
      street_address: address.street_address,
    

      city: address.city,
      state: address.state,
      zip_code: address.zip_code,
      User_id: address.User_id,
      active_shipping: 1,
      //Previous Addresses
      
      pstreet_address: this.oldAddress[index].street_address,
      
      pcity: this.oldAddress[index].city,
      pstate: this.oldAddress[index].state,
      pzip_code: this.oldAddress[index].zip_code
    }
    console.log(this.UpdateStatus)
    this.newService.UpdateUserAddress(updateAddress).subscribe(data=> this.UpdateStatus = data[0]);
    console.log(this.UpdateStatus)
  }
  constructor(private newService: CommonService) {
    this.User_id= localStorage.getItem("userID");
    this.newService.GetUserAddress({user_id : this.User_id}).subscribe(data => this.Address = data)
    this.newService.GetUserAddress({user_id: this.User_id}).subscribe(data => this.oldAddress = data)
  
  }
  ngOnInit() {
  }


}
