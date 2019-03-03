import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

@Component({
  selector: 'create_account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  user={
    first_name: '',
    last_name: '',
    date_of_birth: '',
    phone_number: '',
    email: '',
    password: '',
    rol: ''
  };

  onCreateAccount() {
    this.newService.RegisterUserAdmin(this.user).subscribe(data=> console.log(data[0]))
  }

  constructor(private newService: CommonService) {
   }

  ngOnInit() {
  }

}
