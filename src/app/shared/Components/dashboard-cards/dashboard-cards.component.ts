import { Component, Input, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.scss']
})
export class DashboardCardsComponent implements OnInit {
  @Input('cardInformation') cardInformation:any;
  constructor() { }

  ngOnInit(): void {
  }

}
