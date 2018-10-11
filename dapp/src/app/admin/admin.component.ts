import { Component, OnInit } from '@angular/core';
import {DataService} from '../providers/data-service/data-service';
import {EthcontractService} from './../shared/ethContract.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  addAdminSubscription:Subscription;
   isAdmin:boolean=true;
   users: any= [];
  constructor(private dataService: DataService, private ethcontractService: EthcontractService, private router: Router) { }

  ngOnInit() {
    const self = this;
   let activeAccount= this.ethcontractService.getValidAccount();
    if(activeAccount ==undefined){
       this.router.navigate(['/login']);
    }
    else{
    this.ethcontractService.getAdminUsers().then(admins=>{
      console.log(admins);
      this.users= admins;
    });
  }
 
    this.addAdminSubscription=this.dataService.addAdminSubjectObservable.subscribe((user)=>{
      if(user!=null){
        this.ethcontractService.createAdminUser(user.accountNumber).then(status=>{
          console.log(status);
          self.users.push(user.accountNumber);
        });
      }
    })
  }

  removeUser(event){
      this.users.splice(event,1);
     
  }

  ngOnDestroy() {
    if(this.addAdminSubscription){
      this.addAdminSubscription.unsubscribe();
    }
  }
}
