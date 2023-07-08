import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RestaurentInformation } from 'src/app/models/restaurent';
import { CartService } from 'src/app/service/cart.service';
import { FoodsService } from 'src/app/service/foods.service';
import { RestaurentFoodService } from 'src/app/service/restaurent-food.service';
import { RestaurentauthService } from 'src/app/service/restaurentauth.service';
import { SharedService } from 'src/app/shared/shared.service';
import { AddFoodPopupComponent } from '../add-food-popup/add-food-popup.component';
import { constValues } from 'src/app/constants/const';
import { DeleteComponent } from 'src/app/shared/popup/delete/delete/delete.component';
import { log } from 'console';
import { RestaurentInformationPopupComponent } from '../restaurent-information-popup/restaurent-information-popup.component';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  restaurentName?:string;
  restaurentId:number = 0;
  address?:string;
  displayFoods:any;
  searchKey:string ="";
  constructor(public dialog: MatDialog,private resapi:RestaurentauthService,
           private foodApi: FoodsService,private cartService:CartService,
           private restaurentService:RestaurentFoodService,
           private sharedService:SharedService) { }
          
  ngOnInit(): void {
    this.getRestaurentInformation();
    this.resapi.getUserDataById()
      .subscribe(res => {
        this.restaurentName = res.restaurentName;
        
      })

      this.getAllFoods();
      // this.foodApi.displayAddedFood()
      // .subscribe(data =>{
      //   this.getAllFoods();
      // });
      this.cartService.search.subscribe((val:any)=>{
        this.searchKey = val;
      })
  }

  
  getRestaurentInformation()
  {
    this.restaurentId = this.sharedService.getUserData().id;
    this.restaurentService.getRestaurentInformation(this.restaurentId).subscribe((res:RestaurentInformation)=>{
      this.restaurentName = res.restaurentName;
      this.address = res.address;
    })
  }

  getAllFoods()
  {
    this.restaurentService.getAllFoods(this.restaurentId).subscribe((res)=>{
      this.displayFoods = res;
    })
  }

  onDelete(foodName:string,food:any) {
    let dialogRef = this.dialog.open(DeleteComponent, {
      width: "40%",
      height: "140px",
      panelClass: 'no-padding-dialog',
      disableClose: true,
      data: {
        message:"Are you sure you want to delete : " + foodName
      }
    });
    dialogRef.afterClosed().subscribe(res => {  // received data from delete-component
        if(res.data)
        {
          this.deleteFood(food);
        }
    });

  }
  deleteFood(food:any)
  {
    this.restaurentService.deleteFood(food).subscribe(res =>{
     this.getAllFoods();
    })
  }
  openFoodPopup(pageMode:string,foodData?:any): void {
    let dialogRef = this.dialog.open(AddFoodPopupComponent, {
      width: '600px',
      data:{
        mode:pageMode,
        foodData:foodData
      }
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res)
      {
        setTimeout(()=>{
          this.getAllFoods();
        },1000)
      }
    })
  }

  editRestaurentInformation()
  {
    let dialogRef = this.dialog.open(RestaurentInformationPopupComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(res=>{
      if(res)
      {
        this.getRestaurentInformation();
      }
    })
  }

  get PageMode() {
    return constValues.PAGE_MODE;
  }

}
