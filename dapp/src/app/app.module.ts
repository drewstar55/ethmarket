import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// tslint:disable-next-line:max-line-length
import {MatInputModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatCardModule, MatMenuModule, MatButtonModule, MatGridListModule,  MatDialogModule, MatTooltipModule, MatBadgeModule} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { StoreComponent } from './store/store.component';
import { UserComponent } from './user/user.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { AdminComponent } from './admin/admin.component';
import { UserViewComponent } from './user-view/user-view.component';
import { StoreOwnersComponent } from './store-owners/store-owners.component';
import { StarRatingComponent } from './star-rating/star-rating/star-rating.component';
import { AddStoreComponent } from './add-store/add-store.component';
import { ProductsComponent } from './products/products.component';
import "angular2-navigate-with-data";
import { MyProductsComponent } from './my-products/my-products.component';
import { AddPrdouctComponent } from './add-prdouct/add-prdouct.component';
import { EthcontractService } from './shared/ethContract.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SideNavbarComponent,
    StoreComponent,
    UserComponent,
    HeaderBarComponent,
    AdminComponent,
    UserViewComponent,
    StoreOwnersComponent,
    StarRatingComponent,
    AddStoreComponent,
    ProductsComponent,
    MyProductsComponent,
    AddPrdouctComponent
   

  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatGridListModule,
    MatBadgeModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [UserComponent, AddStoreComponent,AddPrdouctComponent],
  providers: [EthcontractService],
  bootstrap: [AppComponent]
})
export class AppModule { }
