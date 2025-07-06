import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-customer-maintenance',
  templateUrl: './customer-maintenance.component.html',
  styleUrls: ['./customer-maintenance.component.css']
})
export class CustomerMaintenanceComponent implements OnInit {
  customer!: Customer;
  activeTab = 'account'; // Default tab
  
  constructor(
    private dialogService: DialogService
  ) { }
  
  ngOnInit(): void {
    this.initializeCustomer();
  }
  
  initializeCustomer(): void {
    this.customer = {
      customerNo: '',
      name1: '',
      name2: '',
      attentionTo: '',
      customerGroup: '',
      businessType: '',
      paymentCond: '',
      region: '',
      salesperson: '',
      idType: '',
      idNumber: '',
      coRegNo: '',
      tinNo: '',
      remarks: '',
      eligibleForCashSales: false,
      addresses: []
    };
  }
  
  createNewCustomer(): void {
    this.initializeCustomer();
  }
  
  cancelOrClear(): void {
    this.dialogService.confirm(
      'Unsaved data will be lost. Are you sure to continue?',
      'Switch to Initial mode by clearing all the input controls if YES is selected. Remain the current screen if NO is selected.'
    ).subscribe(result => {
      if (result) {
        this.initializeCustomer();
      }
    });
  }
  
  saveCustomer(): void {
    if (this.validateMandatoryFields() && this.validateFields()) {
      // In a real app, you would save to database here
      
      // Show a notification dialog
      this.dialogService.notify('Record Saved').subscribe(() => {
        // Any post-save actions can go here
      });
    }
  }
  
  deleteCustomer(): void {
    this.dialogService.confirm(
      'Are you sure you want to delete this record?',
      'Record deleted if YES selected'
    ).subscribe(result => {
      if (result) {
        // In a real app, you would delete from database here
        
        // Show a notification dialog
        this.dialogService.notify('Record deleted').subscribe(() => {
          this.initializeCustomer();
        });
      }
    });
  }
  
  validateMandatoryFields(): boolean {
    // Implement validation for RED fields
    if (!this.customer.name1) {
      this.dialogService.notify('Name 1 is required');
      return false;
    }
    if (!this.customer.customerGroup) {
      this.dialogService.notify('Customer Group is required');
      return false;
    }
    if (!this.customer.paymentCond) {
      this.dialogService.notify('Payment Condition is required');
      return false;
    }
    if (!this.customer.region) {
      this.dialogService.notify('Bureau is required');
      return false;
    }
    return true;
  }
  
  validateFields(): boolean {
    // Implement validation for BLUE fields
    return true;
  }
  
  switchTab(tab: string): void {
    this.activeTab = tab;
  }
  
  quickSearch(customerNo: string): void {
    // In a real app, you would search the database
    console.log('Searching for customer:', customerNo);
  }
}