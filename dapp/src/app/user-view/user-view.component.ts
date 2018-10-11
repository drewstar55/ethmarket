import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UserComponent } from '../user/user.component';
import { Config } from '../../constants/constant';
import {AppRoutes} from '../app-routes.enum';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  @Input('isAdmin') isAdminPage;
  @Input('users') users;
  @Output('removeUser') removeUser = new EventEmitter();
  title: any;
  buttonText: any;
  constructor(private dialog: MatDialog) {
    if(this.isAdminPage==undefined){
      if(window.location.href.includes(AppRoutes.admin)){
        this.isAdminPage=true;
      }else{
        this.isAdminPage=false;
      }
    }
    if (this.isAdminPage) {
      this.title = Config.admin;
      this.buttonText=Config.addAdmin
    } else {
      this.title = Config.storeOwners;
      this.buttonText=Config.addStoreOwner
    }
  }

  ngOnInit() {
  }

  removeItem(event) {
    this.removeUser.emit(event);
  }

  addUser() {
    const ref = this.dialog.open(UserComponent, {
      height: '400px',
      width: '800px',
      data: {
        'isAdmin': this.isAdminPage
      }
    });
    
  }

  editUser(index){
    const ref = this.dialog.open(UserComponent, {
      height: '400px',
      width: '800px',
      data: {
        'isAdmin': this.isAdminPage,
        'user': this.users[index],
        'isEdit':true
      }
    });
  }

  getUserName(name){
   return name ? name : 'John Doe';
  }

}


