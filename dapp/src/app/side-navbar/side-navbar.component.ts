import { Component, OnInit, Input, Output, EventEmitter, ElementRef, Renderer } from '@angular/core';
import { DataService } from '../providers/data-service/data-service';
import { EthcontractService } from '../shared/ethContract.service';
import { Router } from '@angular/router';
import { Config } from '../../constants/constant';
import { AppRoutes } from '../app-routes.enum';


@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.scss']
})
export class SideNavbarComponent implements OnInit {

  isSuperAdmin: any = false;
  isAdmin: any = false;
  isStoreOwner: any = false;
  currenttab: any;
  previousTab: any;
  highlightTab: any = [];
  @Output('changeTab') public tabchange: EventEmitter<any> = new EventEmitter();


  constructor(private dataService: DataService, private ethcontractService: EthcontractService,
    private router: Router,
    private elementReference: ElementRef,
    private renderer: Renderer) {


  }


  ngOnInit() {
    const tabRef = this.elementReference.nativeElement.querySelector('#' + AppRoutes.store);
    this.previousTab = AppRoutes.store;
    this.renderer.setElementClass(tabRef, 'active', true);
    this.highlightTab = [true, false, false, false, false, false];
    this.ethcontractService.checkAccess().then(accessType => {
      console.log(accessType);
      if (accessType !== undefined) {
        this.isSuperAdmin = accessType[0];
        this.isAdmin = accessType[1];
        this.isStoreOwner = accessType[2];
        localStorage.setItem('isSuperAdmin', accessType[0]);
        localStorage.setItem('isAdmin', accessType[1]);
        localStorage.setItem('isStoreOwner', accessType[2]);
      } else {
        this.router.navigateByUrl('/login');
        //  this.isSuperAdmin = Boolean(localStorage.getItem('isSuperAdmin'));
        // this.isAdmin = Boolean(localStorage.getItem('isAdmin'));
        // this.isStoreOwner = Boolean(localStorage.getItem('isStoreOwner'));
      }
    });



  }
  onTabSelect(tab, index) {
    if (this.previousTab && this.previousTab != tab) {
      const previoustabRef = this.elementReference.nativeElement.querySelector('#' + this.previousTab);
      this.renderer.setElementClass(previoustabRef, 'active', false);
    }
    const tabRef = this.elementReference.nativeElement.querySelector('#' + tab);
    this.renderer.setElementClass(tabRef, 'active', true);
    this.previousTab = tab;
    this.tabchange.emit(tab);
    let itemCount = 0;
    this.highlightTab = this.highlightTab.map((tabItem) => {
      if (itemCount == index) {
        itemCount++;
        return true;
      } else {
        itemCount++;
        return false;
      }

    })
  }


}
