// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component'; // Adjust the path as necessary
import { CreateVisitComponent } from './create-visit/create-visit.component'; // Adjust the path as necessary
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'view-bookings', pathMatch: 'full' },
      { path: 'view-bookings', component: ViewBookingsComponent },
      { path: 'create-visit', component: CreateVisitComponent },
    ]
  },
  { path: 'book-appointment', component: BookAppointmentComponent },

  // ...other routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
