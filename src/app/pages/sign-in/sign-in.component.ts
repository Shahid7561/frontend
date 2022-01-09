import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';

import { account } from '../../../environments/environment';
import { CommonService } from '../../theme/utils/common.service';

import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

// import {
//   AuthService,
//   FacebookLoginProvider,
//   GoogleLoginProvider
// } from 'angular5-social-login';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  [x: string]: any;
  loginForm: FormGroup;
  registerForm: FormGroup;
  auth2: any;
  guser;
  @ViewChild('loginRef', { static: true }) loginElement: ElementRef;
  googleLoginOptions = {
    scope: 'profile email'
  };
  constructor(
    ngZone: NgZone,
    public formBuilder: FormBuilder,
    private commonService: CommonService,
    private authService: SocialAuthService,
    public router: Router, public snackBar: MatSnackBar) {
    // window['onSignIn'] = user => ngZone.run(
    //      () => {
    //      this.afterSignUp(googleUser);
    //      }
    //    )
  }




  // public socialSignIn(socialPlatform : string) {
  //   console.log(socialPlatform);
  //   console.log(GoogleLoginProvider.PROVIDER_ID);
  //   console.log(this.socialAuthService);


  //   let socialPlatformProvider;
  //   if(socialPlatform == "facebook"){
  //     socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  //   }else if(socialPlatform == "google"){
  //     socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  //   }

  //   this.socialAuthService.signIn(socialPlatformProvider).then(
  //     (userData) => {
  //       console.log(socialPlatform+" sign in data : " , userData);
  //       // Now sign-in with userData


  //     }
  //   );
  // }

  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  signInWithGoogle(): void {
    console.log(GoogleLoginProvider);

    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID, this.googleLoginOptions).then((data) => {
      console.log(data);
      let socialData = {
        idToken: data.idToken,
        accessToken: data.authToken
      }
      this.commonService
        .post<any>(account.socialLogin, socialData)
        .subscribe(
          async (res) => {
            console.log(res);
            this.snackBar.open('You logged successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            localStorage.setItem('user', JSON.stringify(res.user));
            localStorage.setItem('token', res.user.token);
            this.router.navigate(['/users']);
          }, err => {
            console.log(err);

          })
    }).catch(data => {
      console.log(data);

      this.authService.signOut();
      // this.router.navigate(['login']);
    });
  }
  signInWithFB(): void {
    console.log(FacebookLoginProvider);

    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data) => {
      console.log("facebook login data",data);
    }).catch(data => {
      console.log(data);

      this.authService.signOut();
      // this.router.navigate(['login']);
    });
  }

  ngOnInit() {
    // this.googleSDK()
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.registerForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'userName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'companyName': [''],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    }, { validator: matchingPasswords('password', 'confirmPassword') });

    //afterSignUp(googleUser)
    //{
    //  console.log(googleUser);
    // }

  }

  public onLoginFormSubmit(values: Object): void {
    if (this.loginForm.valid) {
      let data = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      this.commonService
        .post<any>(account.login, data)
        .subscribe(
          async (res) => {
            console.log(res);
            this.snackBar.open('You logged successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            localStorage.setItem('user', JSON.stringify(res.user));
            localStorage.setItem('token', res.token);
            this.router.navigate(['/users']);
          }, err => {
            console.log(err);
            this.snackBar.open(err.message, '×', { panelClass: 'danger', verticalPosition: 'top', duration: 3000 });
          })
    }
  }

  public onRegisterFormSubmit(values: Object): void {
    console.log(this.registerForm.value);
    this.registerForm.value['phone'] = "1234567890"
    if (this.registerForm.valid) {
      this.commonService
        .post<any>(account.register, this.registerForm.value)
        .subscribe(
          async (res) => {
            console.log(res);
            this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
            let data = {
              email: this.registerForm.value.email,
              password: this.registerForm.value.password
            }
            this.commonService
              .post<any>(account.login, data)
              .subscribe(
                async (res) => {
                  console.log(res);
                  this.snackBar.open('You logged successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                  localStorage.setItem('user', JSON.stringify(res.user));
                  localStorage.setItem('token', res.token);
                  this.router.navigate(['/users']);
                }, err => {
                  console.log(err);
                  this.snackBar.open(err.message, '×', { panelClass: 'danger', verticalPosition: 'top', duration: 3000 });
                })
          }, err => {
            console.log(err);
            this.snackBar.open(err.message, '×', { panelClass: 'danger', verticalPosition: 'top', duration: 3000 });
          })

    }
  }

}
function googleUser(googleUser: any) {
  throw new Error('Function not implemented.');
}

function afterSignUp(googleUser: (googleUser: any) => void) {
  throw new Error('Function not implemented.');
}

