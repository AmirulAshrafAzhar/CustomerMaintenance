import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DialogService } from '../../services/dialog.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../models/customer.model';
import { Address } from '../../models/address.model';

@Component({
  selector: 'app-address-tab',
  templateUrl: './address-tab.component.html',
  styleUrls: ['./address-tab.component.css']
})
export class AddressTabComponent implements OnInit, OnChanges {
  @Input() customer!: Customer;
  addressForm!: FormGroup;
  
  addressTypes = [
    { id: '1', name: 'Invoicing Address' },
    { id: '2', name: 'Main Office Address' },
    { id: '3', name: 'PO Box Mail Address' },
    { id: '9', name: 'No Address Client Only' }
  ];

  getAddressTypeName(typeId: string): string {
    const type = this.addressTypes.find(t => t.id === typeId);
    return type ? type.name : '';
  }
  
  countries = ['Malaysia', 'Singapore', 'Thailand', 'Indonesia']; // Example countries
  
  // Helper methods for template
  getControlError(controlName: string): boolean {
    const control = this.addressForm.get(controlName);
    if (!control) return false;
    if (!control.touched) return false;
    if (!control.errors) return false;
    
    // Check only for required error, not maxlength
    return control.errors['required'] === true;
  }
  
  hasEmailError(): boolean {
    const emailControl = this.addressForm.get('email');
    if (!emailControl) return false;
    if (!emailControl.touched) return false;
    if (!emailControl.errors) return false;
    
    return !!emailControl.errors['email'];
  }
  
  hasMaxLengthError(controlName: string): boolean {
    const control = this.addressForm.get(controlName);
    if (!control) return false;
    if (!control.touched) return false;
    if (!control.errors) return false;
    
    // maxlength error is an object with actualLength and requiredLength properties
    return !!control.errors['maxlength'];
  }
  
  constructor(private fb: FormBuilder, private dialogService: DialogService) { }
  
  ngOnInit(): void {
    this.initForm();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customer'] && !changes['customer'].firstChange) {
      // If the customer object has changed (not the first initialization)
      // Reset the form since we're dealing with a new customer
      this.clearAddressForm();
    }
  }
  
  initForm(): void {
    this.addressForm = this.fb.group({
      addressType: ['', Validators.required],
      addressDescription: ['', [Validators.maxLength(36)]],
      address: ['', [Validators.required, Validators.maxLength(60)]],
      street: ['', [Validators.maxLength(60)]],
      postCode: ['', [Validators.maxLength(10)]],
      city: ['', [Validators.required, Validators.maxLength(40)]],
      state: ['', [Validators.required, Validators.maxLength(25)]],
      country: ['', Validators.required],
      email: ['', [Validators.maxLength(120), Validators.email]],
      phone: ['', [Validators.maxLength(20)]],
      fax: ['', [Validators.maxLength(20)]]
    });
  }
  
  addAddress(): void {
    if (this.validateMandatoryFields()) {
      const newAddress: Address = {
        addressNo: `#${this.customer.addresses.length + 1}`,
        ...this.addressForm.value
      };
      
      this.customer.addresses.push(newAddress);
      this.clearAddressForm();
    }
  }
  
  clearAddressForm(): void {
    this.addressForm.reset();
    // Mark the form as pristine and untouched to remove error states
    this.addressForm.markAsPristine();
    this.addressForm.markAsUntouched();
    
    // Reset validation state for all controls
    Object.keys(this.addressForm.controls).forEach(key => {
      const control = this.addressForm.get(key);
      if (control) {
        control.markAsPristine();
        control.markAsUntouched();
      }
    });
  }
  
  
  confirmDeleteAddress(index: number): void {
    this.dialogService.confirm(
      'Are you sure you want to delete this address record from the list?',
      'Address will be removed if YES selected'
    ).subscribe(result => {
      if (result) {
        this.customer.addresses.splice(index, 1);
        // Renumber addresses
        this.customer.addresses.forEach((addr, idx) => {
          addr.addressNo = `#${idx + 1}`;
        });
        
        // Show a notification dialog
        this.dialogService.notify('Address deleted').subscribe();
      }
    });
  }
  
  validateMandatoryFields(): boolean {
    // Check if required fields (marked in RED) are filled
    if (this.addressForm.invalid) {
      // Mark fields as touched to trigger validation messages
      Object.keys(this.addressForm.controls).forEach(key => {
        const control = this.addressForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
      
      // Check if the form is invalid due to required fields or just maxlength
      const requiredFieldsInvalid = ['addressType', 'address', 'city', 'state', 'country']
        .some(field => {
          const control = this.addressForm.get(field);
          return control && control.errors && control.errors['required'];
        });
      
      // If only maxlength errors exist but all required fields are filled, allow submission
      if (!requiredFieldsInvalid) {
        const hasOnlyMaxLengthErrors = Object.keys(this.addressForm.controls)
          .every(key => {
            const control = this.addressForm.get(key);
            return !control?.errors ||
                  (control.errors &&
                   Object.keys(control.errors).every(err => err === 'maxlength'));
          });
          
        if (hasOnlyMaxLengthErrors) {
          return false; // Don't allow submission if there are maxlength errors
        }
      }
      
      return false;
    }
    return true;
  }
}