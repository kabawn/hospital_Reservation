import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service'; // Adjust the import path as needed
import { Booking } from '../models/booking.model'; // Adjust the import path as needed
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit {
  bookings: Booking[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  private fetchBookings(): void {
    this.bookingService.getBookings().subscribe(
      (data: Booking[]) => {
        console.log(data); // Add this line
        this.bookings = data;
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching bookings:', error);
        this.errorMessage = error.error.message || 'An unexpected error occurred.';
        this.isLoading = false;
      }
    );
  }

  public printPDF(): void {
    let data = document.getElementById('bookingTable');
    
    if (data) {
      html2canvas(data, { scale: 2 }).then(canvas => {
        let imgWidth = 210; // A4 width in mm
        let pageHeight = 295;  // A4 height in mm
        let imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jsPDF('p', 'mm', 'a4');
        let position = 0;

        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
        pdf.save('booking-list.pdf');
      });
    }
  }
}
