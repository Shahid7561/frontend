import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';

import { account} from '../../../environments/environment';
import { CommonService} from '../../theme/utils/common.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(public formBuilder: FormBuilder, 
    private commonService: CommonService,
    public router:Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
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
    },{validator: matchingPasswords('password', 'confirmPassword')});

  }

  public onLoginFormSubmit(values:Object):void {
    if (this.loginForm.valid) {
      let data = {
        email:this.loginForm.value.email,
        password:this.loginForm.value.password
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
        },err=>{
          console.log(err);
          this.snackBar.open(err.message, '×', { panelClass: 'danger', verticalPosition: 'top', duration: 3000 });
        })
    }
  }

  public onRegisterFormSubmit(values:Object):void {
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
            email:this.registerForm.value.email,
            password:this.registerForm.value.password
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
            },err=>{
              console.log(err);
              this.snackBar.open(err.message, '×', { panelClass: 'danger', verticalPosition: 'top', duration: 3000 });
            })
        },err=>{
          console.log(err);
          this.snackBar.open(err.message, '×', { panelClass: 'danger', verticalPosition: 'top', duration: 3000 });
        })
      
    }
  }

}
