import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppRoutes } from '../app-routes.enum';
import { Config } from '../../constants/constant';
import { MatDialog } from '@angular/material';
import { AddStoreComponent } from '../add-store/add-store.component';
import { DataService } from '../providers/data-service/data-service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {EthcontractService} from './../shared/ethContract.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit, OnDestroy {

  title: any;
  isStore: any;
  addStoreSubscription: Subscription;
  updateStoreSubscription: Subscription;
  stores: any=[];

  constructor(private dialog: MatDialog, private dataService: DataService, private router : Router, private  ethcontractService: EthcontractService) {
    
    if (window.location.href.includes(AppRoutes.myStores)) {
      this.isStore = false;
      this.title = Config.myStores;
    } else {
      this.isStore = true;
      this.title = Config.market;
    }
  }

  ngOnInit() {
      let self=this;
    this.addStoreSubscription = this.dataService.addStoreSubjectObservable.subscribe((store) => {
      if (store != null) {
        this.ethcontractService.createStoreFront(store.name, store.description).then(function(status){
          self.stores.push({storedetail:
          [
            store.name,
            store.description
          ]});
      }).catch(function(error){
        console.log(error);
      });
      }
    });
    this.updateStoreSubscription = this.dataService.updateStoreSubjectObservable.subscribe((store) => {
      if (store != null) {
        let index=store.index;
        this.stores[index]=store;
      }
    });
   let activeAccount= this.ethcontractService.getValidAccount();
      if(activeAccount ===undefined){
         this.router.navigate(['/login']);
      }
      else{
        let store='';
        if(this.isStore){
          store='*';
        }
        this.ethcontractService.getStores(store).then((stores)=>{
           this.stores = stores;
           console.log(stores);
         }).catch((error)=>{
           console.log(error);
         });
       }
    

  }

  addStore() {
    const ref = this.dialog.open(AddStoreComponent, {
      height: '400px',
      width: '800px',
      data: {
        'isEdit': false
      }
    });
  }

  ngOnDestroy() {
    if (this.addStoreSubscription)
    {
      this.addStoreSubscription.unsubscribe();
    }

    if (this.updateStoreSubscription)
    {
      this.updateStoreSubscription.unsubscribe();
    }
  }

  editStore(index){
    const ref = this.dialog.open(AddStoreComponent, {
      height: '400px',
      width: '800px',
      data: {
        'isEdit': true,
        'store': this.stores[index],
        'index': index
      }
    });
  }

  removeStore (index){
    this.stores.splice(index,1);
  }

  viewStore( store: any, index) {
    localStorage.setItem('store', JSON.stringify(store));
    localStorage.setItem('index',index);
    if(window.location.href.includes(AppRoutes.myStores)){
      this.router.navigateByData({
        url: ['/dashboard/myproducts'],
        data: [store]
      });
    }else{
      this.router.navigateByData({
        url: ['/dashboard/products'],
        data: [store]
      });
    }
   

  }

}
