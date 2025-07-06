import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-account-tab',
  templateUrl: './account-tab.component.html',
  styleUrls: ['./account-tab.component.css']
})
export class AccountTabComponent implements OnInit, OnChanges {
  @Input() customer!: Customer;
  accountForm!: FormGroup;
  
  // Helper methods for template
  getControlError(controlName: string): boolean {
    const control = this.accountForm.get(controlName);
    return control ? control.invalid && control.touched : false;
  }
  
  customerGroups = ['Direct', 'Agency', 'Contra'];
  businessTypes = ['Legal', 'Metro', 'Finance'];
  paymentConditions = ['30', '45', '60', 'BI'];
  salespersons = ['John Doe', 'Jane Smith', 'Ahmad Abdullah'];
  regions = [
    'Johor',
    'Kedah',
    'Kelantan',
    'Kuala Lumpur',
    'Labuan',
    'Melaka',
    'Negeri Sembilan',
    'Pahang',
    'Penang',
    'Perak',
    'Perlis',
    'Putrajaya',
    'Sabah',
    'Sarawak',
    'Selangor',
    'Terengganu'
  ]; // All states and federal territories in Malaysia
  idTypes = ['BRN', 'IC', 'Army', 'Passport'];
  
  constructor(private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.initForm();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customer'] && !changes['customer'].firstChange) {
      // If the customer object has changed (not the first initialization)
      // Update the form with the new values
      this.updateFormWithCustomerData();
    }
  }
  
  initForm(): void {
    this.accountForm = this.fb.group({
      customerNo: [{value: this.customer.customerNo, disabled: true}],
      name1: [this.customer.name1, [Validators.required, Validators.maxLength(50)]],
      name2: [this.customer.name2, [Validators.maxLength(40)]],
      attentionTo: [this.customer.attentionTo, [Validators.maxLength(35)]],
      customerGroup: [this.customer.customerGroup, Validators.required],
      businessType: [this.customer.businessType],
      paymentCond: [this.customer.paymentCond, Validators.required],
      region: [this.customer.region, Validators.required],
      salesperson: [this.customer.salesperson],
      idType: [this.customer.idType],
      idNumber: [this.customer.idNumber, [Validators.maxLength(15)]],
      coRegNo: [this.customer.coRegNo, [Validators.maxLength(15)]],
      tinNo: [this.customer.tinNo, [Validators.maxLength(15)]],
      remarks: [this.customer.remarks, [Validators.maxLength(60)]],
      eligibleForCashSales: [this.customer.eligibleForCashSales]
    });
    
    // Subscribe to form value changes to update the customer object
    this.accountForm.valueChanges.subscribe(values => {
      Object.assign(this.customer, values);
    });
  }
  
  // Method to update the form with customer data
  updateFormWithCustomerData(): void {
    if (this.accountForm) {
      // Reset the form completely to clear validation states
      this.accountForm.reset();
      
      // Then patch with the new values
      this.accountForm.patchValue({
        customerNo: this.customer.customerNo,
        name1: this.customer.name1,
        name2: this.customer.name2,
        attentionTo: this.customer.attentionTo,
        customerGroup: this.customer.customerGroup,
        businessType: this.customer.businessType,
        paymentCond: this.customer.paymentCond,
        region: this.customer.region,
        salesperson: this.customer.salesperson,
        idType: this.customer.idType,
        idNumber: this.customer.idNumber,
        coRegNo: this.customer.coRegNo,
        tinNo: this.customer.tinNo,
        remarks: this.customer.remarks,
        eligibleForCashSales: this.customer.eligibleForCashSales
      });
      
      // Mark the form as pristine and untouched to remove error states
      this.accountForm.markAsPristine();
      this.accountForm.markAsUntouched();
    }
  }
  
}