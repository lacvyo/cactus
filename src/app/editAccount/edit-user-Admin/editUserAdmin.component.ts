import { Component, OnInit } from '@angular/core';
import {CommonService} from '../../common.service';
import { Key } from 'selenium-webdriver';

@Component({
  selector: 'app-edit-user-admin',
  templateUrl: './editUserAdmin.component.html',
  styleUrls: ['./editUserAdmin.component.scss']
})
export class EditUserAdminComponent implements OnInit {

 
  user_id:any;
  package: {userId:any};
  personalInfo:any;

  constructor(private newService: CommonService) {
    // this.user_id= localStorage.getItem('userID');
    // this.user_id = +this.user_id;
    var x = +localStorage.getItem('idAccount');
    console.log(x);
    this.package= {userId: x};
    
  }
  ngOnInit() {
    
    
    this.newService.GetUserInformation(this.package).subscribe(data => {
     this.personalInfo = {
      first_name: data[0].first_name,
      last_name: data[0].last_name,
      phone_number: data[0].phone_number,
      date_of_birth: data[0].date_of_birth.slice(0, 10),
      email: data[0].email,
      password: data[0].password,
      user_id: Number(data[0].user_id),
      user_active: Number(data[0].user_active),
      rol: data[0].rol
      }
   });
   
  }

  onUpdate() {
    console.log(this.personalInfo)
   this.newService.UpdateUserInformation(this.personalInfo).subscribe(data => console.log(data))
  }
}
