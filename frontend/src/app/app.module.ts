import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './pages/products/products.component';

import { AccountComponent } from './pages/account/account.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products.component';
import { CreateProductComponent } from './pages/create-product/create-product.component';
import { CustomersComponent } from './pages/customers/customers.component';

import { LoaderComponent } from './shared/loader/loader.component';
import { FilterComponent } from './components/filter/filter.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { AuthComponent } from './pages/auth/auth.component';

import { AuthInterceptor } from './inteceptor/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    SidebarComponent,
    NavbarComponent,
    ProductDetailsComponent,
    OrdersComponent,
    FooterComponent,
    ManageProductsComponent,
    CreateProductComponent,
    LoaderComponent,
    FilterComponent,
    AuthComponent,
    CustomersComponent,
    AccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
        },
        vertical: {
          position: 'top',
        },
      },
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
