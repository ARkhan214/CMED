import { Routes } from '@angular/router';
import { LoginComponent } from './components/login-component/login-component';
import { MedicineComponent } from './components/medicine-component/medicine-component';
import { PrescriptionComponent } from './components/prescription-component/prescription-component';
import { UserComponent } from './components/user-component/user-component';
import { UserRegistrationComponent } from './components/user-registration-component/user-registration-component';
import { CreatePrescription } from './components/create-prescription/create-prescription';
import { ViewAllUsers } from './components/view-all-users/view-all-users';
import { PrescriptionViewComponents } from './components/prescription-view-components/prescription-view-components';
import { PrescriptionReportComponent } from './components/prescription-report-component/prescription-report-component';
import { UserGuard } from './guard/user-guard-guard';

export const routes: Routes = [
  // Default route → Login page
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Open For all
  { path: 'login', component: LoginComponent },
  { path: 'registeration', component: UserRegistrationComponent },

  // Other feature routes
  { path: 'medicines', component: MedicineComponent, canActivate: [UserGuard] },
  { path: 'prescriptions', component: PrescriptionComponent, canActivate: [UserGuard] },
  { path: 'prescriptionview/:id', component: PrescriptionViewComponents, canActivate: [UserGuard] },
  { path: 'prescriptionreport', component: PrescriptionReportComponent, canActivate: [UserGuard] },
  { path: 'createprescriptions', component: CreatePrescription, canActivate: [UserGuard] },
  { path: 'users', component: UserComponent, canActivate: [UserGuard] },
  { path: 'viewallusers', component: ViewAllUsers, canActivate: [UserGuard] },

  // Wildcard route → if page not found
  { path: '**', redirectTo: 'login' }
];
