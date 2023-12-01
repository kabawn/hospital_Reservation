// src/app/models/booking-request.model.ts
export interface BookingRequest {
  fullName: string;
  age: number | null; // Allow age to be number or null
  phoneNumber: string;
  visitId: string; // Assuming visitId is required for booking
}

// src/app/models/booking-response.model.ts
export interface BookingResponse {
  message: string;
  booking: {
    _id: string;
    fullName: string;
    age: number;
    phoneNumber: string;
    bookingNumber: string;
    visit: {
      _id: string;
      doctorName: string;
      specialty: string;
      visitDate: Date;
    };
  };
}