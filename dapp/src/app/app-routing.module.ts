import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutes } from 'src/app/app-routes.enum';
import { LoginComponent } from 'src/app/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoreComponent } from './store/store.component';
import { AdminComponent } from './admin/admin.component';
import { StoreOwnersComponent } from './store-owners/store-owners.component';
import { ProductsComponent } from './products/products.component';
import { MyProductsComponent } from './my-products/my-products.component';

const routes: Routes = [
  {
    path: AppRoutes.base,
    pathMatch: 'full',
    redirectTo: AppRoutes.login// AppRoutes.Dashboard
    // canActivate: [LoggedInGuard]
  },
  {
    path: AppRoutes.login,
    component:LoginComponent
  },
  {
    path: AppRoutes.dashboard,
    component: DashboardComponent,
    // canActivate: [LoggedInGuard]
    children: [
      { path: AppRoutes.store, component: StoreComponent},
      { path: AppRoutes.admin, component: AdminComponent},
      {path: AppRoutes.storeOwners,component:StoreOwnersComponent},
      {path: AppRoutes.myStores, component: StoreComponent, },
      {path: AppRoutes.products, component: ProductsComponent},
      {path: AppRoutes.myProducts, component: MyProductsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
