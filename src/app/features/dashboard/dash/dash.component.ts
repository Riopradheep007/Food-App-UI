import { AfterViewInit, Component, OnInit } from '@angular/core';
import {Chart,registerables} from 'node_modules/chart.js';
import { Dashboard } from 'src/app/models/restaurent';
import { RestaurentFoodService } from 'src/app/service/restaurent-food.service';
import { SignalrService } from 'src/app/service/signalr.service';
import { SharedService } from 'src/app/shared/shared.service';
Chart.register(...registerables);
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit{
  widgets:any;
  public chart: any;
  restaurentId:number = 0;
  constructor(private restaurentService:RestaurentFoodService,private sharedService:SharedService,
    private signalrService:SignalrService) { }

  ngOnInit(): void {
   setTimeout(()=>{
    this.popularFoodChart();
   },0);
   this.getUserID();
   this.getDashboardData();

  }
  getDashboardData()
  {
    this.restaurentService.getDashboardData(this.restaurentId).subscribe((res:Dashboard)=>{
      this.loadWidgets(res);
      this.revenueChart(res.revenues);
    });

    this.signalrService.getDashboardData().subscribe((res:any)=>{
       if(res){
        this.loadWidgets(res);
         this.revenueChart(res.revenues);
       }
    });
  }
  getUserID()
  {
     this.sharedService.userData.subscribe((res) =>{
      this.restaurentId = res.id;
    });
  }

  loadWidgets(data:Dashboard) {
    this.widgets = [
      {
       "title":"Customers",
        "icon":"person",
        "count":data.customers,
        "cardColor": '#59A5FF'
      },
      {
        "title":"Revenue",
         "icon":"euro",
         "count":data.revenue,
         "cardColor": '#38DBB9'
       },
       {
        "title":"Pending Orders",
         "icon":"delivery_dining",
         "count":data.pendingOrders,
         "cardColor":'#FF6981'
       },
       {
        "title":"Deliverd Orders",
         "icon":"check_circle",
         "count":data.deliveredOrders,
         "cardColor":'#FEC266'
       },
       {
        "title":"Cancelled Orders",
         "icon":"cancel",
         "count":data.cancelledOrders,
         "cardColor":'#AEB1FE'
       },
    ]
  }

  revenueChart(revenue:number[])
  {
    let chart =  new Chart("revenue-chart", {
      type: 'bar',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'],
        datasets: [{
          label: 'Revenue',
          data: revenue,
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(255, 205, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(201, 203, 255, 0.8)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  popularFoodChart() {
    let foodChart = new Chart("food-chart",{
      type: 'doughnut',
      data:{
        labels: [
          'Spices',
          'Icecream',
          'Juice'
        ],
        datasets: [{
          label: 'food',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]
      }
    });
  }
}
