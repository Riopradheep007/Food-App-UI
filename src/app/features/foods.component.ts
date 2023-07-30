import { Component, OnInit ,ViewChild,ElementRef, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { SharedService } from '../shared/shared.service';
import { SideBarMenu } from '../models/sideBarMenu.model';
import { RestaurentFoodService } from '../service/restaurent-food.service';
@Component({
  selector: 'app-foods',
  templateUrl: './foods.component.html',
  styleUrls: ['./foods.component.scss']
})
export class FoodsComponent implements OnInit {
  userName?:string;
  role:string = '';
  sideNavWidth:any = '180px';
  totalItem:number = 0;
  receivedOrdersCount:number = 0;
  showFiller = false;
  public searchTerm !: string;
  menuItems:any;
  constructor(private router:Router,private cartservice:CartService,
     private sharedService:SharedService,private restaurentService:RestaurentFoodService) { }
  sideBarMenu:SideBarMenu[] = [];
  ngOnInit(): void {
 
    this.sideNavWidth = '70px';
    this.sharedService.getDataFromSessionStorage();
    this.getUserData();
    this.loadSideBarMenus();
    this.cartservice.getProducts()
    .subscribe(a => {
       this.totalItem = a.length;
    });
    this.getPendingOrdersCount();
   
  }

  getPendingOrdersCount()
  {
    this.restaurentService.getPendingOrdersCount().subscribe((res:any)=>{
       this.receivedOrdersCount = res;
    });
  }
    
  getUserData()
  {
    this.sharedService.userData.subscribe((res) =>{
        this.userName = res.name;
        this.role = res.role;
    })
  }
  loadSideBarMenus() {
    if(this.role)
    {
      this.sharedService.getSideBarMenu(this.role).subscribe((res:SideBarMenu[]) =>{
          this.sideBarMenu = res;
      })
    }
  }
 
  // ngAfterViewInit(): void {
  //   this.menuItems = document.getElementById("menu-items")!;
  //   this.menuItems.style.maxHeight = "0px";
  // }
  
  openCart() {
    this.router.navigate(['cart'])
  }

  openOrders() {
    this.router.navigate(['orders']);
  }

  logout(){
    localStorage.setItem("customerLogin","false");
    this.sharedService.clearSessionData();
    this.router.navigate(['/auth/login']);
  }
  expand(drawer:any) {
    if(this.sideNavWidth == '70px'){
      this.sideNavWidth = '180px';
    }
    else{
      this.sideNavWidth = '70px';
    }
  
  }

  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartservice.search.next(this.searchTerm);
  }

  toggle() {

    if(this.menuItems.style.maxHeight == "0px") {
      console.log("working");
      
      this.menuItems.style.maxHeight = "200px";
    }
    else {
      this.menuItems.style.maxHeight = "0px";
    }
  }



}
