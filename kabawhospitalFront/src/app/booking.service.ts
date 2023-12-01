// src/app/booking.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from './models/booking.model'; // Adjust the import path as needed
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private backendUrl = 'http://localhost:5000'; // Ensure this is the correct URL

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getBookings(): Observable<Booking[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.authService.getJwtToken()}`
      })
    };
    
    // Log the token to make sure it's being sent
    console.log('Sending token:', httpOptions.headers.get('Authorization'));
  
    return this.http.get<Booking[]>(`${this.backendUrl}/admin/bookings`, httpOptions);
  }
}
