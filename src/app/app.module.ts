import { BrowserModule } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import {AboutComponent} from './about/about.component';
import {ContactComponent} from './contact/contact.component'
import {CartComponent} from './cart/cart.component'
import { AgmCoreModule } from '@agm/core';
import {NavBarComponent} from "./navbar/navbar.component";
import {PaymentComponent} from "./payment/payment.component";
import {ProfileComponent} from "./profile/profile.component";


import { NgModule } from "@angular/core";
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import {CommonService} from './common.service';

import { UserSettingsComponent } from './user-settings/user-settings.component';
import { EditAddressComponent } from './user-settings/edit-address/edit-address.component';
import { EditUserInfoComponent } from './user-settings/edit-user-info/edit-user-info.component';
import { AdminComponent } from './admin/admin.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ManageAccountComponent } from './manage-account/manage-account.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { SalesComponent } from './sales/sales.component';
import { EditProductComponent} from './editProduct/editProduct.component';
import { ViewOrderComponent } from './view-order/view-order.component';
import { EditAccountComponent } from './editAccount/editAccoun.component';
import {EditAddressAdminComponent}from './editAccount/edit-addres-Admin/editAddreAdmin.component';
import {EditUserAdminComponent}from './editAccount/edit-user-Admin/editUserAdmin.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { SalesByProductComponent } from './sales-by-product/sales-by-product.component';
import { RevenueReportComponent } from './revenue-report/revenue-report.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    LogInComponent,
    RegisterComponent,
    AboutComponent,
    ContactComponent,
    CartComponent,
    NavBarComponent,
    PaymentComponent,
    ProfileComponent,
    UserSettingsComponent,
    EditAddressComponent,
    EditUserInfoComponent,
    AdminComponent,
    AddProductComponent,
    CreateAccountComponent,
    ManageAccountComponent,
    ManageProductsComponent,
    SalesComponent,
    EditProductComponent,
    ViewOrderComponent,
    EditAccountComponent,
    EditAddressAdminComponent,
    EditUserAdminComponent,
    SalesReportComponent,
    SalesByProductComponent,
    RevenueReportComponent
  ],
  imports: [
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAv_X_na-8I5BKiJd4qhILO2o3hXAAA6aM'}),
    MDBBootstrapModule.forRoot(),
    RouterModule.forRoot([
     {
       path:'', component: HomeComponent
     },
     {
      path:'products', component: ProductsComponent
     },
     {
       path: 'log_in', component: LogInComponent
      },
     {
       path: 'register', component:RegisterComponent
     },
     {
       path: 'about', component:AboutComponent
     },
     {
       path: 'contact', component:ContactComponent
     },
     {
       path: 'cart', component:CartComponent
     },
     {
       path: 'payment', component:PaymentComponent
     },
     {
       path: 'profile', component:ProfileComponent
     },
     {
      path: 'admin', component: AdminComponent
    },
    {
      path: 'user_settings', component: UserSettingsComponent
    },
    {
      path: 'add_product', component: AddProductComponent
    },
    {
      path: 'create_account', component: CreateAccountComponent
    },
    {
      path: 'manage_account', component: ManageAccountComponent
    },
    {
      path: 'manage_products', component: ManageProductsComponent
    },
    {
      path: 'sales', component: SalesComponent
    },
    {
     path: 'edit_product/:id', component: EditProductComponent
   },
   {
     path: 'view_order', component: ViewOrderComponent
   },
   {
     path: 'edit_account', component: EditAccountComponent
   },
  
   
    ]),
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule {


 }
