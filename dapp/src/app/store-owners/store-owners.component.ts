import { Component, OnInit } from '@angular/core';
import { DataService } from '../providers/data-service/data-service';
import { Subscription } from 'rxjs';
import {EthcontractService} from './../shared/ethContract.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-owners',
  templateUrl: './store-owners.component.html',
  styleUrls: ['./store-owners.component.scss']
})
export class StoreOwnersComponent implements OnInit {

  isAdmin: boolean=false;
  addStoreOwnerSubscription: Subscription;
  users: any=[ ]
 constructor(private dataService: DataService, private  ethcontractService: EthcontractService, private router : Router) {
  
 
  }

 ngOnInit() {
   const self = this;
  this.addStoreOwnerSubscription=this.dataService.addStoreOwnerSubjectObservable.subscribe((user)=>{
    if(user!=null){
      this.ethcontractService.addStoreOwnerDetails(user.accountNumber).then(function(status){
        console.log(status);
        self.users.push(user.accountNumber);
    }).catch(function(error){
      console.log(error);
    });
    }
  })

 let activeAccount= this.ethcontractService.getValidAccount();
      if(activeAccount ===undefined){
         this.router.navigate(['/login']);
      }else{
      this.ethcontractService.getStoreOwners().then(storeOwners => {
        console.log(storeOwners);
        this.users = storeOwners;
      });
      }
 }

 removeUser(event){
     this.users.splice(event,1);
    
 }

 ngOnDestroy(){

  if(this.addStoreOwnerSubscription){
    this.addStoreOwnerSubscription.unsubscribe();
  }
 }

}
