import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { RestaruentSignup } from 'src/app/models/restaurentsignup.model';
import { RestaurentauthService } from 'src/app/service/restaurentauth.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-restaurent-signup',
  templateUrl: './restaurent-signup.component.html',
  styleUrls: ['./restaurent-signup.component.scss']
})
export class RestaurentSignupComponent implements OnInit {
  firstFormGroup = this._formBuilder.group({
    Name: ['', Validators.required],
    Email:['',Validators.required],
    PhoneNumber:['',Validators.required],
    RestaurentName:['',Validators.required],
    Address:['',Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    PanNumber: ['', Validators.required],
    GstinNumber: ['', Validators.required],
    FssaiNumber: ['', Validators.required],
    AccountNumber: ['', Validators.required],
    IfscCode: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    password:['',Validators.required],
    confirmPassword:['',Validators.required]
  });
  isEditable = false;
  passwordHide = true;
  confirmPasswordHide = true;
  passwordError = false;
  informationList:string[] = [];
  constructor(private _formBuilder: FormBuilder,
    private restaurentService:RestaurentauthService,
    private snackBar:SnackbarService,
    private router:Router) {}


  ngOnInit(): void {
    this.loadInformation();
    this.validatePassword();
  }
  loadInformation() {
    let information:string[] = ["PAN card Number","Bank account details",
                      "Regular GSTIN","FSSAI license Number","Phone Number","Your restaurant Name"];
    this.informationList = information;
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

  signup() {
   let param:RestaruentSignup = {
     name:this.selectedName.value,
     restaurentName:this.selectedRestaurentName.value,
     address:this.selectedAddress.value,
     phoneNumber:this.selectedPhoneNumber.value,
     email:this.selectedEmail.value,
     password:this.selectedPassword.value,
     panNumber:this.selectedPanNumber.value,
     GSTIN:this.selectedGstinNumber.value,
     Gender:'M',
     FSSAI:this.selectedFssaiNumber.value,
     IFSC_Code:this.selectedIfscCode.value,
     accountNumber:this.selectedAccountNumber.value
   }

   if(!this.passwordError)
   {
    this.restaurentService.AddUserData(param)
    .subscribe(data => {
      this.snackBar.success("register successfully!!",500);
      setTimeout(() =>{
      this.router.navigate(['login']);
      },550)
    })
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
  get selectedAddress():FormControl {
    return this.firstFormGroup.get("Address") as FormControl;
  }
  get selectedRestaurentName():FormControl {
    return this.firstFormGroup.get("RestaurentName") as FormControl;
  }
  get selectedGstinNumber():FormControl {
    return this.secondFormGroup.get("GstinNumber") as FormControl;
  }
  get selectedPanNumber():FormControl {
    return this.secondFormGroup.get("PanNumber") as FormControl;
  }
  get selectedFssaiNumber():FormControl {
    return this.secondFormGroup.get("FssaiNumber") as FormControl;
  }
  get selectedAccountNumber():FormControl {
    return this.secondFormGroup.get("AccountNumber") as FormControl;
  }
  get selectedIfscCode():FormControl {
    return this.secondFormGroup.get("IfscCode") as FormControl;
  }
  get selectedPassword():FormControl {
    return this.thirdFormGroup.get("password") as FormControl;
  }
  get selectedConfirmPassword():FormControl {
    return this.thirdFormGroup.get("confirmPassword") as FormControl;
  }

  
}
