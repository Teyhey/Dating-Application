import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { DataServiceService } from '../_services/data-service.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: true },
    },
  ],
})
export class NavComponent implements OnInit  {
  model: any = {};
  photoUrl: string;
  showLogin = false;
  registerMode =  false;

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router,
    private data: DataServiceService
  ) {}

  ngOnInit(): void {
    this.authService.currentPhotoUrl.subscribe(
      (photoUrl) => (this.photoUrl = photoUrl)
    );
  }

  registerToggle(bool: boolean): void {
    this.data.toggleRegister(bool);
  }

  showLoginFields(): void {
    this.showLogin = true;
  }

  login(): void {
    this.authService.login(this.model).subscribe(
      (next) => {
        this.alertify.success('Logged in successfully!');
      },
      (error) => {
        this.alertify.error('Failed to login');
      },
      () => {
        this.router.navigate(['/members']);
      }
    );
  }

  loggedIn(): any {
    return this.authService.loggedIn();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }
}
