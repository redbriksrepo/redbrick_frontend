import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthenticationService } from '../services/authentication.service';
import { LocalStorageService } from '../services/localstrage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  forceLogin: boolean = false;

  constructor(
    private AuthService: AuthenticationService,
    private router: Router,
    private localStroage: LocalStorageService
  ) { }

  loginForm = new FormGroup({
    'userName': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
  }

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit = async () => {
    let loginData = { ...this.loginForm.value, forceLogin: this.forceLogin };
    (await this.AuthService.login(loginData)).subscribe({
      next: (result: any) => {
        if (result.Message === 'User Login Successfull!') {
          console.log('result::',result);
          this.localStroage.setItem('auth-token', result.Token);
          this.router.navigate(['/dashboard']);
        }
      },
      error: (result: any) => {
        if (result.error.Message === "User Have Already Logged In From Another Device!") {
          console.log('Already logged In');
          this.forcedLogin();
        }
      }
    })
    this.forceLogin = false;

  }

  forcedLogin = () => {
    Swal.fire({
      title: 'Already Logged In!',
      text: 'you have already logged In from another device. do you want to log out from previous device and continue loggin on this device ?',
      icon: 'warning',
      confirmButtonText: 'Continue Log In',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
      showConfirmButton: true
    }).then((confirmation) => {
      if (confirmation.isConfirmed) {
        this.forceLogin = true;
        this.onSubmit();
      }
    })
  }

}
