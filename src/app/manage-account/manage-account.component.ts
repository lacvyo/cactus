import { Component, OnInit } from '@angular/core';
import {CommonService} from '../common.service';
@Component({
  selector: 'manage_account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.scss']
})
export class ManageAccountComponent implements OnInit {
  account= []
  repasswordInput: any;
  passwordInput: any;
  emailInput: any;
  nameInput: any;
  //var nameInput, emailInput,passwordInput,repasswordInput;

  verifyAccounts(){
    console.log(this.nameInput + this.emailInput + this.passwordInput + this.repasswordInput);
  }
  constructor(private newService :CommonService) { 
    this.newService.getAllAccounts().subscribe(data => this.account = data)
  }

  ngOnInit() {
  }

  btnlocal(x:any){

    localStorage.setItem('idAccount', x);
  }

}
