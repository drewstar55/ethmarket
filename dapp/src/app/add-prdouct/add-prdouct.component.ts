import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl, NgForm } from '@angular/forms';
import {DataService} from '../providers/data-service/data-service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Config} from '../../constants/constant';

@Component({
  selector: 'app-add-prdouct',
  templateUrl: './add-prdouct.component.html',
  styleUrls: ['./add-prdouct.component.scss']
})
export class AddPrdouctComponent implements OnInit {

  productFormGroup: FormGroup;
  title: any;
  buttonText: any;
  constructor(private builder: FormBuilder, private dataService: DataService, @Inject(MAT_DIALOG_DATA) public data: any,private matDialogRef:MatDialogRef<AddPrdouctComponent> ) {
   this.buttonText=Config.save;
    
        if(data.isEdit){
        this.title = Config.updateProduct;
        this.buttonText=Config.update;
      }else{
        this.title = Config.createProduct;
      }
    
  
    this.productFormGroup = this.builder.group({
      name: [null, Validators.compose(
        [Validators.required, Validators.pattern(Config.alphabetonly)]
      )],
      description: [null, Validators.compose(
        [Validators.required]
      )],
      price: [null, Validators.compose(
        [Validators.required]
      )],
      quantity: [null, Validators.compose(
        [Validators.required]
      )],
      storeName: [data.store.storedetail[1], Validators.compose(
        [Validators.required]
      )]
    });
    this.productFormGroup.controls['storeName'].disable();
    if(data.isEdit){
    this.productFormGroup.patchValue({
     name: data.product[0],
     description: data.product[1],
     price: data.product[2],
     quantity: data.product[3]
    });
    }
  }

  ngOnInit() {
  }

  createProduct(form: any) {
    this.productFormGroup.reset();
    this.matDialogRef.close();
    if(!this.data.isEdit){
    this.dataService.addProduct(form);
    }else{
      form.index=this.data.index;
      this.dataService.updateProduct(form);
    }
   
  }
  close(){
    this.matDialogRef.close();
  }


}
