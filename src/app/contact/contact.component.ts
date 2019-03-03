import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})




export class ContactComponent implements OnInit {

public map: any = { lat: 18.468885, lng: -66.741513 };
  constructor() { }

  ngOnInit() {
  }

}
