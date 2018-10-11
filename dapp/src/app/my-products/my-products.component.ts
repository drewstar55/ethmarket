import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material';
import { AddPrdouctComponent } from '../add-prdouct/add-prdouct.component';
import {DataService} from '../providers/data-service/data-service';
import { Router } from '@angular/router';
import {Config} from '../../constants/constant';
import {AddStoreComponent} from '../add-store/add-store.component';
import {EthcontractService} from './../shared/ethContract.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit {

  currentStore: any;
  quantity: any = 1;
  buttonText: any;
  quantiyArray: any = [];
  paymentArray: any=[];
  previousIndex:any;
  addProductSubscriber:any;
  updateProductSubscriber:any;
  storeBalance:any;
  products: any = [
  
  ];
  constructor(private dataService: DataService,
    private router: Router,
    private matDialog:MatDialog,
    private  ethcontractService: EthcontractService
    ) {
      let self=this;
      this.buttonText= Config.buy;
      this.addProductSubscriber = this.dataService.createProductSubjectObservable.subscribe((product) => {
        if (product != null) {
          this.ethcontractService. addProductToTheStore(this.currentStore.storeAddr, product.name, product.description, product.price,  product.quantity).then(function(status){
            console.log(status);
            self.products.push({'productdetail':[
              product.name,
              product.description,
              product.price,
              product.quantity
            ]})
         }).catch(function(error){
          console.log(error);
         });
        }
      });

      this.updateProductSubscriber = this.dataService.updateProductSubjectObservable.subscribe((product) => {
        if (product != null) {
        let index= Number(localStorage.getItem('index'));
          this.ethcontractService.updateProduct(this.currentStore.storeAddr,index+1,product.name,product.description,Number(product.price), Number(product.quantity)).then((products)=>{
            // this.products = products;
            this.products[index].productdetail[0]= product.name ;
            this.products[index].productdetail[1]= product.description ;
            this.products[index].productdetail[2]= Number(product.price) ;
            this.products[index].productdetail[3]= Number(product.quantity) ;
            console.log(products);
            // that.balance = acctInfo.balance;
           }).catch((error)=>{
            console.log(error);
           });
        }
      });
  }


  ngOnInit() {
    let data = this.router.getNavigatedData();

    this.currentStore = data ? data[0] : JSON.parse(localStorage.getItem('store'));
    let activeAccount= this.ethcontractService.getValidAccount();
    if(activeAccount ===undefined){
       this.router.navigate(['/login']);
    }

    
    this.ethcontractService.getProductsInStore(this.currentStore.storeAddr).then((products)=>{
   this.products = products;
   console.log(products);
   this.ethcontractService.getStoreBalance(this.currentStore.storeAddr).then((storeBalance)=>{
     console.log('store balance' + storeBalance);
    this.storeBalance = storeBalance;
    // that.balance = acctInfo.balance;
  }).catch((error)=>{
    console.log(error);
  });
   // that.balance = acctInfo.balance;
 }).catch((error)=>{
   console.log(error);
 });

  }

  editProduct(index){
    const ref = this.matDialog.open(AddPrdouctComponent, {
      height: '600px',
      width: '700px',
      data: {
        'isEdit': true,
        'product': this.products[index].productdetail,
        'index':index,
        'store':this.currentStore
      }
    });
  }

  removeProduct(index){
this.products.splice(index,1);
  }

 

  addProduct(){

    const ref = this.matDialog.open(AddPrdouctComponent, {
      height: '600px',
      width: '700px',
      data: {
        'isEdit': false,
        'store': this.currentStore,
      }
    });
  }

  ngOnDestroy(){

 if(this.addProductSubscriber) {
   this.addProductSubscriber.unsubscribe();
 }

 if(this.updateProductSubscriber) {
  this.updateProductSubscriber.unsubscribe();
}

  }

  editStore(){
    const ref = this.matDialog.open(AddStoreComponent, {
      height: '400px',
      width: '800px',
      data: {
        'isEdit': true,
        'store': this.currentStore,
        'index': Number(localStorage.getItem('index'))
      }
    });
  }

}
