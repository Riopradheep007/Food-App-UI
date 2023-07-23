import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserauthService } from 'src/app/service/userauth.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { customerLogin } from 'src/app/models/login.models';
import { SharedService } from 'src/app/shared/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { SignalrService } from 'src/app/service/signalr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  roles:string[]= ["Customer","Restaurent","DeliveryRider"];
  constructor(private api:UserauthService,private router:Router,private signalrService:SignalrService,
    private snackBar:SnackbarService,private sharedService:SharedService) {

  }

  ngOnInit(): void {
   this.sharedService.clearSessionData();
  //   if(this.api.isInvalid) {
  //     this.router.navigate(['spices'])
  //  }
  this.signalrService.broadCastData('hello');
  this.signalrService.helloMessage().subscribe((res:any) =>{
     console.log(res);
  })
  }

  loginForm = new FormGroup({
    email: new FormControl('pradheep1341@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('1234', [Validators.required, Validators.minLength(2)]),
    roles: new FormControl('Restaurent',[Validators.required])
  });

  navigateCustomerSignup()
  {
    this.router.navigate(['auth/customersignup'])
  }
  
  login() {
    let param:customerLogin = {
      email : this.loginForm.value.email,
      password:this.loginForm.value.password,
      role:this.loginForm.get('roles')?.value
    }
    
    this.api.customerLogin(param)
    .subscribe({
      next: (res) =>{
        if(res) {
          this.snackBar.success("Login succesfully!!",500);
          this.sharedService.setUserInformationInSessionStorage(res);
            setTimeout(() =>{
            this.loginForm.reset();
            this.router.navigate(["/dashboard"]);
          },560)
        }
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open("You dont have account singup and login",'X','snackBarWarning');
      }});
  }
  onSubmit() {
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }
}
