import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { RestaurentauthService } from 'src/app/service/restaurentauth.service';
import { FoodsService } from 'src/app/service/foods.service';
import { RestaurentFoodService } from 'src/app/service/restaurent-food.service';
import { SharedService } from 'src/app/shared/shared.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { constValues } from 'src/app/constants/const';

@Component({
  selector: 'app-add-food-popup',
  templateUrl: './add-food-popup.component.html',
  styleUrls: ['./add-food-popup.component.scss']
})
export class AddFoodPopupComponent implements OnInit {
  url = "../../../../assets/uploadImage.jpg";
  newlyUploadedImage:boolean = false;
  imageName: any;
  foodTypes:string[] = ["spices","icecream","juice"];
  foodCurrentlyavailable:string[] = ["Yes","No"];
 
  addFoodForm = new FormGroup({
    foodName: new FormControl("", [Validators.required]),
    foodType: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    currentlyAvailable: new FormControl('', [Validators.required]),
  })

  
  constructor(public dialogRef: MatDialogRef<AddFoodPopupComponent>,
    private resapi:RestaurentauthService,private snackBar:SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private resturentFoodService:RestaurentFoodService,private sharedService:SharedService) {
     
    }

  

  ngOnInit(): void {
    if(this.data.mode == this.pageMode.EDIT)
    {
      this.addFoodForm.get('foodType')?.disable();
      this.addFoodForm.patchValue(this.data.foodData);
      let foodAvailable = this.data.foodData.currentlyAvailable == 'Y'?'Yes':'No'
      this.addFoodForm.get('currentlyAvailable')?.setValue(foodAvailable);
      this.url = "../../../../assets/RestaurentImageDataBase/"+this.data.foodData.imagePath;
    }
  }

   getUserData()
  {
    let id;
    this.sharedService.userData.subscribe(res =>{
      id = res.id;
    })
    return id;
  }
  previewBeforeUpload() {

    document.querySelector("#file-1")?.addEventListener("change", (e: any) => {

      if (e.target.files.length == 0) {
        return;
      }
      let file = e.target.files[0];
      
      let reader = new FileReader();
      reader.readAsDataURL(file);
    
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.newlyUploadedImage = true;
        document.querySelector('#file-1-preview img')?.setAttribute('src', this.url);
        const imageUrl = (document.getElementById('file-1') as HTMLInputElement).value;
        this.imageName = imageUrl?.split("\\")[2];
      }
    });
  }

   addFood()
  {
    let payload = this.addFoodForm.value;
    payload.id =   this.getUserData();
    payload.foodImage = this.url;
    payload.CurrentlyAvailable = this.addFoodForm.get('currentlyAvailable')?.value == 'Yes'? 'Y':'N';
    let data = {
      ...payload
    }
    this.resturentFoodService.addFoods(data).subscribe((resp)=>{
      this.snackBar.success("Food added successfully");
      this.dialogRef.close({ data: true });
    })
  }
  updateFood()
  {
    let data = {
     id:this.data.foodData.id,
     restaurentId: this.data.foodData.restaurentId,
     foodName:this.addFoodForm.get('foodName')?.value,
     price:this.addFoodForm.get('price')?.value,
     currentlyAvailable:this.addFoodForm.get('currentlyAvailable')?.value == 'Yes'? 'Y':'N',
     foodImage: this.newlyUploadedImage?this.url:"",
     imagePath:this.data.foodData.imagePath,
     foodType: this.addFoodForm.getRawValue().foodType

    }
    this.resturentFoodService.updateFood(data).subscribe((resp:any)=>{
      this.snackBar.success("Food updated successfully");
      this.dialogRef.close({ data: true });
    })

  }
  get pageMode()
  {
    return constValues.PAGE_MODE;
  }

}
