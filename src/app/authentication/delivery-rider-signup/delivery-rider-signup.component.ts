import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { DeliveryPartnerSignup } from 'src/app/models/deliveryPartnerSignup.model';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-delivery-rider-signup',
  templateUrl: './delivery-rider-signup.component.html',
  styleUrls: ['./delivery-rider-signup.component.scss']
})
export class DeliveryRiderSignupComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    Name: ['', Validators.required],
    Email:['',Validators.required],
    PhoneNumber:['',Validators.required],
    Gender:['',Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    PanNumber: ['', Validators.required],
    DrivingLicenseNumber: ['', Validators.required],
    AccountNumber: ['', Validators.required],
    IfscCode: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    password:['',Validators.required],
    confirmPassword:['',Validators.required]
  });
  isEditable = true;
  passwordHide = true;
  confirmPasswordHide = true;
  passwordError = false;
  informationList:string[] = [];
  constructor(private _formBuilder: FormBuilder,
    private snackBar:SnackbarService,
    private router:Router) { }

  ngOnInit(): void {
    this.loadInformation();
    this.validatePassword();
  }

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

  loadInformation() {
    let information:string[] = ["PAN card Number","Bank account details",
                      "Driving License","Phone Number"];
    this.informationList = information;
  }


  
  signup() {
    let param:DeliveryPartnerSignup = {
      name:this.selectedName.value,
      phoneNumber:this.selectedPhoneNumber.value,
      email:this.selectedEmail.value,
      password:this.selectedEmail.value,
      panNumber:this.selectedPanNumber.value,
      ifscCode:this.selectedIfscCode.value,
      accountNumber:this.selectedAccountNumber.value,
      gender:this.selectedGender.value,
      drivingLicenseNumber:this.selectedLicenseNumber.value
    }
 
    if(this.passwordError)
    {
    //  this.restaurentService.putUserData(param)
    //  .subscribe(data => {
    //    this.snackBar.success("register successfully!!",500);
    //    setTimeout(() =>{
    //    this.router.navigate(['login']);
    //    },550)
    //  })
    }
 
   }
 
   get selectedName():FormControl {
     return this.firstFormGroup.get("Name") as FormControl;
   }
   get selectedEmail():FormControl {
     return this.firstFormGroup.get("Email") as FormControl;
   }
   get selectedPhoneNumber():FormControl {
     return this.firstFormGroup.get("PhoneNumber") as FormControl;
   }
   get selectedGender():FormControl {
     return this.secondFormGroup.get("Gender") as FormControl;
   }
   get selectedPanNumber():FormControl {
     return this.secondFormGroup.get("PanNumber") as FormControl;
   }
   get selectedAccountNumber():FormControl {
     return this.secondFormGroup.get("AccountNumber") as FormControl;
   }
   get selectedIfscCode():FormControl {
     return this.secondFormGroup.get("IfscCode") as FormControl;
   }
   get selectedLicenseNumber():FormControl {
    return this.secondFormGroup.get("DrivingLicenseNumber") as FormControl;
  }
   get selectedPassword():FormControl {
     return this.thirdFormGroup.get("password") as FormControl;
   }
   get selectedConfirmPassword():FormControl {
     return this.thirdFormGroup.get("confirmPassword") as FormControl;
   }
 
}
