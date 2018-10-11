import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl, NgForm } from '@angular/forms';
import { Config } from '../../constants/constant';
import { DataService } from '../providers/data-service/data-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.scss']
})
export class AddStoreComponent implements OnInit {

  storeGroup: FormGroup;
  title: any;
  buttonText: any;
  constructor(private builder: FormBuilder, private dataService: DataService, @Inject(MAT_DIALOG_DATA) public data: any, private matDialogRef: MatDialogRef<AddStoreComponent>) {
    this.buttonText = Config.save;

    if (data.isEdit) {
      this.title = Config.updateStore;
      this.buttonText = Config.update;
    } else {
      this.title = Config.newStore;
    }
  
    this.storeGroup = this.builder.group({
    name: [null, Validators.compose(
      [Validators.required, Validators.pattern(Config.alphabetonly)]
    )],
  description: [null, Validators.compose(
    [Validators.required]
  )],

});
if(data.isEdit){
  this.storeGroup.patchValue(data.store);
}
  }

ngOnInit() {
}

createStore(form: any) {
  this.storeGroup.reset();
  this.matDialogRef.close();
  if(!this.data.isEdit){
    this.dataService.addStore(form);
  }else{
    form.index=this.data.index;
    this.dataService.updateStore(form);
  }
}


close() {
  this.matDialogRef.close();
}

}
