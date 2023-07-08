import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RestaurentInformation } from 'src/app/models/restaurent';
import { RestaurentFoodService } from 'src/app/service/restaurent-food.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-restaurent-information-popup',
  templateUrl: './restaurent-information-popup.component.html',
  styleUrls: ['./restaurent-information-popup.component.scss']
})
export class RestaurentInformationPopupComponent implements OnInit {
  newlyUploadedImage:boolean = false;
  restaurentStatus:String[] = ["Open","Close"];
  restaurentInformationForm = new FormGroup({
    restaurentName: new FormControl(''),
    description: new FormControl(''),
    address: new FormControl(''),
    status: new FormControl('')
  })
  constructor(private sharedService:SharedService, public dialogRef: MatDialogRef<RestaurentInformationPopupComponent> ,private snackBar:SnackbarService,
    private resturentFoodService:RestaurentFoodService) { }

  ngOnInit(): void {
    this.getRestaurentInformation();
  }

  getUserData()
  {
    let id = 0;
    this.sharedService.userData.subscribe(res =>{
      id = res.id;
    })
    return id;
  }
  updateRestaurentInformation()
  {
    let payload = this.restaurentInformationForm.value;
    payload.restaurentId = this.getUserData();
    payload.RestaurentStatus = this.restaurentInformationForm.get('status')?.value == 'Open'?'Y':'N';
    this.resturentFoodService.updateRestaurentInformation(payload).subscribe((res:any)=>{
      this.snackBar.success("Restaurent Information updated successfully");
      this.dialogRef.close({ data: true });
    });
  }
  getRestaurentInformation() 
  {
    this.resturentFoodService.getRestaurentInformation(this.getUserData()).subscribe((res:RestaurentInformation)=>{
      this.restaurentInformationForm.patchValue({
        restaurentName:res.restaurentName,
        description:res.description,
        address:res.address,
        status:res.restaurentStatus == 'Y'?'Open':'Close'
      })
    });
  }

}
