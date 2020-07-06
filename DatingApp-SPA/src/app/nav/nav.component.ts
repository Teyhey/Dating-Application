import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {


  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  ngOnInit() {

  }

}
