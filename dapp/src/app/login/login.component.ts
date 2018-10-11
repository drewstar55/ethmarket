import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {EthcontractService} from './../shared/ethContract.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;
  constructor( private builder: FormBuilder, private router: Router, private ethcontractService: EthcontractService) {
    this.loginFormGroup = this.builder.group({
        accountNumber: [null, Validators.compose(
          [Validators.required]
        )],
      });
   }

  ngOnInit() {
  }

  login(form: any){
    let status= this.ethcontractService.setValidAccount(form.accountNumber);
    console.log(status);
     this.router.navigateByUrl('/dashboard');
  }
}
