import { Component, OnInit} from '@angular/core';
import {FormGroup,FormControl,Validators, FormsModule} from '@angular/forms';  
import {CommonService} from './common.service';  
import {Http,Response, Headers, RequestOptions } from '@angular/http';  
import { variable } from '@angular/compiler/src/output/output_ast';
import { longStackSupport } from 'q';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string;
  err: string;
  userId: string;
  checkEmail: string;
  checkPass: string;

  // credential: {
  //   userID:string,
  //   checkEmail: string,
  //   checkPassword: string
  // }[] = [{
  //     userID: '1',
  //     checkEmail: 'j@gmail.com',
  //     checkPassword: 'josean'
  //   },
  //   {
  //     userID: '2',
  //     checkEmail: 'josean@gmail.com',
  //     checkPassword: 'josean'
  //   }
  // ]; // Esto viene de un query

  logged = false;

  constructor(private newService: CommonService, private router: Router, private route: ActivatedRoute) {
    // console.log(this.Repdata);
    this.logged = localStorage.getItem('logged') === 'true';
  }



   
  ValidatedUser;
  checkCredentials() {
    // if (this.checkEmail === this.credential[0].checkEmail && this.checkPass === this.credential[0].checkPassword) {
    //   return 1;
    // } else {
    //   return 2;
    // }
   
   return this.ValidatedUser;
  }


  onLogIn() {
    var user= {email: this.checkEmail, password: this.checkPass};
   
    this.newService.LogInVerification(user).subscribe( data => this.ValidatedUser = data[0])
   
  // console.log(this.ValidatedUser)
    if (this.ValidatedUser != '') {
      this.logged = true;
      this.err = '';

      //this.newService.getUserId(this.checkEmail).subscribe(  data => this.userId = data[0].user_id)
      var x= this.ValidatedUser.user_id
      console.log(this.ValidatedUser.user_id)
      localStorage.setItem('logged', this.logged.toString());
      localStorage.setItem('userID', this.ValidatedUser.user_id);
      localStorage.setItem('admin', this.ValidatedUser.rol);
      var y = localStorage.getItem('userID')
      var rol = localStorage.getItem('admin')

     
      if(rol == "1"){
        this.router.navigate([`/add_product`], { relativeTo: this.route });
      }

      console.log(y);
      console.log(rol)

    } else {
        this.err = 'Incorrect credential';
    }
  }

  onLogOut() {
    this.logged = false;
    this.userId='';
    this.checkEmail='';
    this.checkPass='';
    localStorage.removeItem('logged');
    localStorage.removeItem('userID');
    localStorage.removeItem('admin');
  }
  ngOnInit() {
    // this.newService.GetUser().subscribe(data => this.title = data[0].title);
  }

}
