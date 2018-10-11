import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

 private addAdminSubject = new BehaviorSubject(null);
  addAdminSubjectObservable = this.addAdminSubject.asObservable();
  private addStoreOwnerSubject = new BehaviorSubject(null);
  addStoreOwnerSubjectObservable = this.addStoreOwnerSubject.asObservable();
  private addStoreSubject = new BehaviorSubject(null);
  addStoreSubjectObservable = this.addStoreSubject.asObservable();
  private updateStoreSubject = new BehaviorSubject(null);
  updateStoreSubjectObservable = this.updateStoreSubject.asObservable();
  private createProductSubject = new BehaviorSubject(null);
  createProductSubjectObservable = this.createProductSubject.asObservable();
  private updateProductSubject = new BehaviorSubject(null);
  updateProductSubjectObservable = this.updateProductSubject.asObservable();
  currentStore: any;

  private isSuperAdmin:any;

  private isAdmin:any;

  private isStoreOwner:any;

  constructor() { }

  ngOnInit() {
    console.log('service executed');
  }

  addAdmin(user: any) {
    this.addAdminSubject.next(user);
  }
  addStoreOwner(user: any) {
    this.addStoreOwnerSubject.next(user);
  }

  addStore(store: any){
    this.addStoreSubject.next(store);
  }

  updateStore(store : any){
    this.updateStoreSubject.next(store);
  }

  setCurrentStore(store: any){
    this.currentStore = store;
  }

  getCurrentStore(){
    return this.currentStore;
  }

  addProduct(product: any){
   this.createProductSubject.next(product);
  }

  updateProduct(product: any){
    this.updateProductSubject.next(product);
  }

  setLoggedInUserDetails(accessType){
     this.isSuperAdmin= accessType[0];
     localStorage.setItem('isSuperAdmin',accessType[0]);
     this.isAdmin= accessType[1];
     localStorage.setItem('isAdmin',accessType[1]);
     this.isStoreOwner= accessType[2];
     localStorage.setItem('isStoreOwner', accessType[2]);
  }

  getIsSuperAdmin(){
    // tslint:disable-next-line:no-trailing-whitespace
    return this.isSuperAdmin ;
  }

  getIsAdmin(){
    return this.isAdmin ;
  }

  getIsStoreOwner(){
    return this.isStoreOwner ;
  }
}
