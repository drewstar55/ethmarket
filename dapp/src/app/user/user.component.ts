import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl, NgForm } from '@angular/forms';
import { Config } from '../../constants/constant';
import { DataService } from '../providers/data-service/data-service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userFormGroup: FormGroup;
  title: any;
  buttonText: any;
  constructor(private builder: FormBuilder, private dataService: DataService, @Inject(MAT_DIALOG_DATA) public data: any,private matDialogRef:MatDialogRef<UserComponent> ) {
   this.buttonText=Config.save;
    if ( data.isAdmin ) {
        if(data.isEdit){
        this.title = Config.updateAdmin;
        this.buttonText=Config.update;
      }else{
        this.title = Config.newAdmin;
      }
    
   }
   else {
     if(data.isEdit){
    this.title = Config.updateStoreOwner;
    this.buttonText=Config.update;
     }else{
      this.title = Config.newStoreOwner;
     }
   }
    this.userFormGroup = this.builder.group({
    /*  userName: [null, Validators.compose(
        [Validators.required, Validators.pattern(Config.alphabetonly)]
      )],*/
      accountNumber: [null, Validators.compose(
        [Validators.required]
      )],

    });
  }

  ngOnInit() {
  }

  createUser(form: any) {
    this.userFormGroup.reset();
    this.matDialogRef.close();
    if(this.data.isAdmin){
    this.dataService.addAdmin(form);
    } else{
      this.dataService.addStoreOwner(form);
    }
    
  }
  close(){
    this.matDialogRef.close();
  }

}
