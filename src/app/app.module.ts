import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerMaintenanceComponent } from './components/customer-maintenance/customer-maintenance.component';
import { AccountTabComponent } from './components/account-tab/account-tab.component';
import { AddressTabComponent } from './components/address-tab/address-tab.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerMaintenanceComponent,
    AccountTabComponent,
    AddressTabComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
