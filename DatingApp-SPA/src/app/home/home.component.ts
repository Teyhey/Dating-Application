import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataServiceService } from '../_services/data-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  registerMode: boolean;
  values: any;

  constructor(
    private http: HttpClient,
    private data: DataServiceService) {
      this.data.currentRegisterBool.subscribe(bool => this.registerMode = bool);
    }

  ngOnInit(): void {
    this.data.currentRegisterBool.subscribe(bool => this.registerMode = bool);
      }

  registerToggle(): void{
    this.registerMode = true;
    console.log(this.registerMode);
  }


  cancelRegisterMode(registerMode: boolean): void{
    this.registerMode = registerMode;
    console.log(this.registerMode);
  }

}
