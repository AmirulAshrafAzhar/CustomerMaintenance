import { Address } from './address.model';

export interface Customer {
  customerNo: string;
  name1: string;
  name2: string;
  attentionTo: string;
  customerGroup: string;
  businessType: string;
  paymentCond: string;
  region: string;
  salesperson: string;
  idType: string;
  idNumber: string;
  coRegNo: string;
  tinNo: string;
  remarks: string;
  eligibleForCashSales: boolean;
  addresses: Address[];
}