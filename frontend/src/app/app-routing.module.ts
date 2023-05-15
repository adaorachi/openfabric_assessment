import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './pages/auth/auth.component';

import { AccountComponent } from './pages/account/account.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ProductsComponent } from './pages/products/products.component';
import { RouteGuard } from './route-guard/route-guard';


const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
  {path: 'products', component: ProductsComponent},
  {path: 'account', component: AccountComponent},
  {path: 'manage-products', component: ManageProductsComponent, canActivate: [RouteGuard]},
  {path: 'create-product', component: CreateProductComponent, canActivate: [RouteGuard]},
  {path: 'edit-product/:productId', component: CreateProductComponent, canActivate: [RouteGuard]},
  { path: 'orders', component: OrdersComponent, canActivate: [RouteGuard] },
  {path: 'customers', component: CustomersComponent, canActivate: [RouteGuard]},
  { path: 'product/:productId', component: ProductDetailsComponent },
  
  {path: 'login', component: AuthComponent},
  {path: 'register', component: AuthComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [RouteGuard]
})
export class AppRoutingModule { }
