// src/app/book-appointment/book-appointment.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookingRequest, BookingResponse } from '../models/booking-request.model';
import { Visit } from '../models/visit.model';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.css']
})
export class BookAppointmentComponent implements OnInit {
  upcomingVisits: Visit[] = [];
  selectedVisitId?: string; // It can be undefined initially
  booking: Omit<BookingRequest, 'visitId'> = {
    fullName: '',
    age: null, // Age can be null as per your model definition
    phoneNumber: ''
  };
  showForm = true; // To control the display of the form
  successMessage?: string; // To display a success message
  errorMessage?: string; // To display an error message

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch the upcoming visit details from the server
    this.http.get<Visit[]>('http://localhost:5000/visits/upcoming').subscribe(
      visits => {
        this.upcomingVisits = visits;
        if (visits.length > 0) {
          this.selectedVisitId = visits[0]._id; // Default to the first visit in the list
        } else {
          this.showForm = false; // Hide the form if there are no upcoming visits
          this.errorMessage = 'No upcoming visits are available at this time.';
        }
      },
      error => {
        console.error('Error fetching upcoming visits:', error);
        this.errorMessage = 'Could not fetch visits at this time.';
        this.showForm = false; // Hide the form since an error occurred
      }
    );
  }

  onSubmit(): void {
    if (!this.selectedVisitId) {
      this.errorMessage = 'Please select a visit for your appointment.';
      return;
    }

    const bookingRequest: BookingRequest = {
      ...this.booking,
      visitId: this.selectedVisitId, // Ensure the selected visit ID is included
    };

    this.http.post<BookingResponse>('http://localhost:5000/bookings/book-appointment', bookingRequest).subscribe(
      response => {
        this.showForm = false; // Hide the form on successful submission
        this.successMessage = `تم تاكيد حجزك بنجاح و هذا رقم الحجز الخاص بك ${response.booking.bookingNumber}.`;
      },
      error => {
        console.error('Error creating booking:', error);
        this.errorMessage = 'There was a problem creating your booking.';
      }
    );
  }
}
