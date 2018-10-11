import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { DataService } from '../providers/data-service/data-service';
import { Router } from '@angular/router';
import { Config } from '../../constants/constant';
import { Location } from '@angular/common';
import { EthcontractService } from '../shared/ethContract.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  currentStore: any;
  quantity: any = 1;
  buttonText: any;
  quantiyArray: any = [];
  paymentArray: any=[];
  previousIndex:any;
  transactionCompleted:any;
  products: any = [
    
  ];
  constructor(private dataService: DataService,
    private router: Router,
    private elementReference: ElementRef,
    private renderer: Renderer,
  private location: Location,
  private ethcontractService: EthcontractService) {
      this.buttonText= Config.buy;
  }


  ngOnInit() {
    let data = this.router.getNavigatedData();

    this.currentStore = data ? data[0] : JSON.parse(localStorage.getItem('store'));
    this.products.forEach(() => {
      this.quantiyArray.push(false);
      this.paymentArray.push(false);
    }

    )

    let activeAccount= this.ethcontractService.getValidAccount();
    if(activeAccount ===undefined){
       this.router.navigate(['/login']);
    }



    this.ethcontractService.getProductsInStore(this.currentStore.storeAddr).then((products)=>{
   this.products = products;
   console.log(products);
   // that.balance = acctInfo.balance;
 }).catch((error)=>{
   console.log(error);
 });

  }

  decreaseQuantity(index) {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity(index) {
    if (this.quantity <= this.products[index].productdetail[3]) {
      this.quantity++;
    }
  }

  getEnableValue(index) {
    return this.quantiyArray[index];
  }

  getPaymentValue(index){
    return this.paymentArray[index];
  }

  pay(index) {
    let productIndex= index;
    let store= this.currentStore.storeAddr? this.currentStore.storeAddr : localStorage.getItem('store')['storeAddr'];
        this.ethcontractService.buyProduct(this.currentStore.storeAddr, ++productIndex, this.quantity ).then((products)=>{
          let paymentDiv = this.elementReference.nativeElement.querySelector('#pay_' + index);
          this.paymentArray[index]=true;
          this.quantiyArray[index]=false;
          this.transactionCompleted = Config.completeTransaction;
          this.products[index].productdetail[3] = this.products[index].productdetail[3]-this.quantity;
          setTimeout(()=>{
            this.paymentArray[index]= false;
          }, 2000);
      }).catch((error)=>{
       console.log(error);
       this.paymentArray[index]=true;
       this.quantiyArray[index]=false;
      });
   
    //this.renderer.setElementStyle(paymentDiv,)
   
  }

  backToStore(){
    this.location.back();
  }


  buy(index) {
    let buttonDiv= this.elementReference.nativeElement.querySelector('#button_' + index);
    let buttonInnerText=buttonDiv.innerText;
    if(buttonInnerText==Config.buy){
    this.quantity=1;
    if(this.previousIndex || this.previousIndex==0){
      this.quantiyArray[this.previousIndex]=false;
      let previousProduct= this.elementReference.nativeElement.querySelector('#product_' + this.previousIndex);
      let previousButton= this.elementReference.nativeElement.querySelector('#button_' + this.previousIndex);
      previousButton.innerText = Config.buy;
      this.renderer.setElementStyle(previousProduct,'background-color','#B2B1D0');
      this.renderer.setElementStyle(previousProduct,'opacity','1');
    }
    let productDiv = this.elementReference.nativeElement.querySelector('#product_' + index);
    let buttonDiv= this.elementReference.nativeElement.querySelector('#button_' + index)
    this.renderer.setElementStyle(productDiv,'background-color','#000000');
    this.renderer.setElementStyle(productDiv,'opacity','0.5');
    buttonDiv.innerText = Config.pay;
    this.quantiyArray[index]=true;
    this.previousIndex=index;
  }
  else{
    this.pay(index);
  }
}
}
