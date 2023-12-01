import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BookingsListComponent } from './components/bookings-list/bookings-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HomeComponent } from './components/home/home.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CreateVisitComponent } from './create-visit/create-visit.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component';
import { BookAppointmentComponent } from './book-appointment/book-appointment.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    BookingsListComponent,
    NavbarComponent,
    LogoutComponent,
    HomeComponent,
    CreateVisitComponent,
    ViewBookingsComponent,
    BookAppointmentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
