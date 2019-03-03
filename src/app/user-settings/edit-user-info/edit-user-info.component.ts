import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../common.service';

@Component({
  selector: 'app-edit-user-info',
  templateUrl: './edit-user-info.component.html',
  styleUrls: ['./edit-user-info.component.scss']
})
export class EditUserInfoComponent implements OnInit {
  user_id:any;
  package: {userId:any};
  personalInfo:any;

  constructor(private newService: CommonService) {
    this.user_id= localStorage.getItem('userID');
    this.user_id = +this.user_id;
    this.package= {userId: this.user_id};
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
      user_id: Number(data[0].user_id)
      }
   });
   
  }

  onUpdate() {
   this.newService.UpdateUserInformation(this.personalInfo).subscribe(data => console.log(data))
  }
}
