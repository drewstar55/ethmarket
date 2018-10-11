import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { DataService } from '../providers/data-service/data-service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  accessType:any;
  constructor( private router: Router, private dataService: DataService) {

   }

  ngOnInit() {
    console.log('In dashboard');
    this.router.navigateByUrl(`/dashboard/store`);
  }
  changeTab(tab){
      this.router.navigateByUrl(`/dashboard/${tab}`);
  

}
}