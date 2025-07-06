import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerMaintenanceComponent } from './components/customer-maintenance/customer-maintenance.component';

const routes: Routes = [
  { path: '', redirectTo: '/customer-maintenance', pathMatch: 'full' },
  { path: 'customer-maintenance', component: CustomerMaintenanceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
