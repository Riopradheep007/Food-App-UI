import { AfterViewInit, Component, OnInit } from '@angular/core';
import {Chart,registerables} from 'node_modules/chart.js';
Chart.register(...registerables);
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
export class DashComponent implements OnInit,AfterViewInit{
  widgets:any;
  public chart: any;
  constructor() { }

  ngOnInit(): void {
   this.loadWidgets();
   setTimeout(()=>{
    this.revenueChart();
    this.popularFoodChart();
   },0);
   

  }
  ngAfterViewInit(){
  }

  loadWidgets() {
    this.widgets = [
      {
       "title":"Customers",
        "icon":"person",
        "count":500,
        "cardColor": '#59A5FF'
      },
      {
        "title":"Revenue",
         "icon":"euro",
         "count":10000,
         "cardColor": '#38DBB9'
       },
       {
        "title":"Pending Orders",
         "icon":"delivery_dining",
         "count":2,
         "cardColor":'#FF6981'
       },
       {
        "title":"Deliverd Orders",
         "icon":"check_circle",
         "count":5,
         "cardColor":'#FEC266'
       },
       {
        "title":"Cancelled Orders",
         "icon":"cancel",
         "count":15,
         "cardColor":'#AEB1FE'
       },
    ]
  }

  revenueChart()
  {
    let chart =  new Chart("revenue-chart", {
      type: 'bar',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'],
        datasets: [{
          label: 'Revenue',
          data: [12, 19, 3, 5, 2, 3,25],
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
