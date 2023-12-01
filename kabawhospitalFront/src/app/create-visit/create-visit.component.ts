import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Visit } from '../models/visit.model'; // Ensure you have a Visit model
declare var bootstrap: any;

@Component({
  selector: 'app-create-visit',
  templateUrl: './create-visit.component.html',
  styleUrls: ['./create-visit.component.css']
})
export class CreateVisitComponent implements OnInit {
  visit = {
    doctorName: '',
    specialty: '',
    visitDate: ''
  };
  visits: any[] = [];
  isSubmitted = false;
  isFetching = false;
  errorMessage = '';

// Add a property for the editable visit
editableVisit: Visit = {
  doctorName: '',
  specialty: '',
  visitDate: new Date() // Use a default date, or another appropriate default value
};


  constructor(
    private http: HttpClient,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.fetchVisits();
  }

  // Fetch all visits
  fetchVisits(): void {
    this.isFetching = true;
    const headers = this.createHeaders();
    this.http.get<any[]>('http://localhost:5000/admin/visits', { headers }).subscribe(
      (data) => {
        this.visits = data;
        this.isFetching = false;
      },
      (error) => {
        console.error('Error fetching visits:', error);
        this.errorMessage = error.error.message || 'An unexpected error occurred.';
        this.isFetching = false;
      }
    );
  }

  // Handle form submission to create a new visit
  onSubmit(): void {
    const headers = this.createHeaders();
    this.http.post('http://localhost:5000/admin/visits', this.visit, { headers }).subscribe(
      (response) => {
        console.log('Visit created:', response);
        this.isSubmitted = true;
        this.fetchVisits(); // Refresh the list of visits
      },
      (error) => {
        console.error('Error creating visit:', error);
        this.errorMessage = error.error.message || 'An unexpected error occurred.';
      }
    );
  }

  // Delete a visit
  onDeleteVisit(visitId: string): void {
    const headers = this.createHeaders();
    this.http.delete(`http://localhost:5000/admin/visits/${visitId}`, { headers }).subscribe(
      (response) => {
        console.log('Visit deleted:', response);
        this.fetchVisits(); // Refresh the list after delete
      },
      (error) => {
        console.error('Error deleting visit:', error);
        this.errorMessage = error.error.message || 'Failed to delete visit.';
      }
    );
  }

   // Method to open the modal with visit data
   onEditVisit(visit: Visit): void {
    this.editableVisit = { ...visit }; // Clone the visit data
    const editModal = new bootstrap.Modal(document.getElementById('editVisitModal'));
    editModal.show();
  }

  // Method to update the visit
  updateVisit(): void {
    if (!this.editableVisit) return;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getJwtToken()}`
    });

    this.http.put(`http://localhost:5000/admin/visits/${this.editableVisit._id}`, this.editableVisit, { headers })
      .subscribe(
        response => {
          console.log('Visit updated:', response);
          // Close the modal programmatically
          const editModal = bootstrap.Modal.getInstance(document.getElementById('editVisitModal'));
          editModal.hide();
          // Refresh the visits list or handle the UI update
        },
        error => {
          console.error('Error updating visit:', error);
          this.errorMessage = error.error.message || 'An unexpected error occurred.';
        }
      );
  }

  // Helper method to create HttpHeaders with Authorization token
  private createHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getJwtToken()}`
    });
  }
}
