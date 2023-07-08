import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { UserSignupData } from 'src/app/models/signup-model';
import { UserauthService } from 'src/app/service/userauth.service';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/service/snackbar.service';
@Component({
  selector: 'app-customersignup',
  templateUrl: './customersignup.component.html',
  styleUrls: ['./customersignup.component.scss']
})
export class CustomersignupComponent implements OnInit {
  passwordHide = true;
  confirmPasswordHide = true;
  passwordError = false;
 
  constructor(private api:UserauthService,private router:Router,
    private snackBar:SnackbarService) { }

  ngOnInit(): void {
    this.validatePassword();
  }

  signupForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10)]),
    gender: new FormControl('',Validators.required),
    conformPassword: new FormControl('',Validators.required)
  });

  validatePassword(){
    this.selectedPassword.valueChanges.subscribe((value)=> {
       if(value != this.selectedConfirmPassword.value){
         this.passwordError = true;
       }
       else{
         this.passwordError = false;
       }
    })
    this.selectedConfirmPassword.valueChanges.subscribe((value)=> {
       if(value != this.selectedPassword.value){
         this.passwordError = true;
       }
       else{
         this.passwordError = false;
       }
    })
   }

  
  postUserData() {
    let data:UserSignupData = {
       name: this.signupForm.get('name')?.value,
       email: this.email.value,
       password:this.signupForm.value.password,
       phoneNumber: this.signupForm.value.phoneNumber,
       gender:this.signupForm.get('gender')?.value
       
    }
  

    this.api.putUserData(data)
    .subscribe(data => {
      this.snackBar.success("register successfully!!",500);
      setTimeout(() =>{
      this.signupForm.reset();
      this.router.navigate(['login']);
      },550)
    })

  }
   
  // custom validator to check that two fields match
  onSubmit() {

    //console.warn(this.signupForm.value);

  }

  get email():FormControl  {
    return this.signupForm.get("email") as FormControl ;
  }

  get selectedPassword():FormControl {
    return this.signupForm.get("password") as FormControl;
  }

  get selectedConfirmPassword():FormControl {
    return this.signupForm.get("conformPassword") as FormControl;
  }

  get phoneNumber():FormControl  {
    return this.signupForm.get("phoneNumber") as FormControl ;
  }

}
