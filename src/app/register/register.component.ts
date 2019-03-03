import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators, FormsModule } from '@angular/forms';  
import { CommonService } from '../common.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user= {
    tempFirstName: '',
    tempLastName: '',
    tempDate: '',
    tempPhone: '',
    tempEmail: '',
    tempPassword: ''
  };
  
    query=`Verificar si existe una cuenta \n
    SELECT count(email) 
    FROM user
    WHERE email = $email 
    Si no existe una cuenta entonces se inserta \n
    INSERT INTO user (id, first_name, last_name, email, password, phone_number, user_active, date_of_birth)
    VALUES (id, $first_name, $last_name, $email, $password, $phone_number, user_active, $date_of_birth)`;
  
  
  
    userExist;
    onInsertUser() {
      if (this.user.tempEmail != '' && this.user.tempPassword != '' )
      {
        var newData;
        this.newService.RegisterUser(this.user).subscribe( data => {this.userExist= data})
        console.log(this.userExist)
      } 
    }
    constructor(private newService: CommonService) { }
    ngOnInit() { }
}
