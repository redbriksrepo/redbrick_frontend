
import { Component, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { LocalStorageService } from './services/localstrage.service';
// import { ElectronApiService } from './services/electron-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-electron';

  isAuthenticated!: boolean;
  subscription!: Subscription;

  constructor(private authService: AuthenticationService, private localStorage: LocalStorageService, private router: Router) { }

  ngOnInit(): void {
    this.checkAuthentication();
  }

  checkAuthentication() {
    this.isAuthenticated = (localStorage.getItem('auth-token')) ? true : false;
    this.subscription = this.localStorage.watchStorage().subscribe(() => {
      this.isAuthenticated = (localStorage.getItem('auth-token')) ? true : false;
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout = async () => {
    (await this.authService.logOut()).subscribe((result: any) => {
      if (result.Message === 'user logout sucessfully!') {
        this.localStorage.removeItem('auth-token');
        this.router.navigate(['/login']);
      }
    });
  }

}
