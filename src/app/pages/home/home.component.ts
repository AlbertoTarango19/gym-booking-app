import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookingListComponent } from '../../components/booking-list/booking-list.component';
import { BookingDetailComponent } from '../../components/booking-detail/booking-detail.component';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, BookingListComponent, BookingDetailComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isDarkTheme = true;
  bookings: Booking[] = [];
  selectedBooking?: Booking;
  searchTerm = '';
  loading = true;
  reservationMessage = '';

  constructor(private bookingService: BookingService) {}
  // Initializes the component and loads the bookings when the component is created.
  ngOnInit(): void {
    this.loadBookings();
  }
  // Loads the list of bookings from the BookingService and updates the component state.
  loadBookings(): void {
    this.loading = true;
    this.bookingService.getBookings().subscribe((bookings) => {
      this.bookings = bookings;
      this.loading = false;
    });
  }
  // Filters the bookings based on the search term entered by the user.
  get filteredBookings(): Booking[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      return this.bookings;
    }
    return this.bookings.filter(
      (booking) =>
        booking.className.toLowerCase().includes(term) ||
        booking.instructor.toLowerCase().includes(term) ||
        booking.schedule.toLowerCase().includes(term)
    );
  }
  // Handles the selection of a booking from the list and resets any reservation messages.
  selectBooking(booking: Booking): void {
    this.selectedBooking = booking;
    this.reservationMessage = '';
  }
  // Reserves the selected booking by calling the BookingService and updates the component state based on the result.
  reserveBooking(): void {
    if (!this.selectedBooking) {
      return;
    }
    // Call the BookingService to reserve the selected booking and handle the response.
    this.bookingService.reserveBooking(this.selectedBooking.id).subscribe((updated) => {
      if (!updated) {
        this.reservationMessage = 'No se pudo completar la reserva.';
        return;
      }

      this.bookings = this.bookings.map((booking) =>
        booking.id === updated.id ? updated : booking
      );
      this.selectedBooking = updated;
      this.reservationMessage = updated.availableSpots > 0
        ? 'Reserva realizada con éxito. Tu cupo está apartado.'
        : '¡Último cupo tomado! Revisa otra clase disponible.';
    });
  }
  // Toggles the theme between dark and light modes and updates the document's class accordingly.
  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    document.documentElement.classList.toggle('dark-theme', this.isDarkTheme);
    document.documentElement.classList.toggle('light-theme', !this.isDarkTheme);
  }
  // Tracks bookings by their unique ID to optimize rendering in the booking list.
  trackByBooking(_: number, booking: Booking): number {
    return booking.id;
  }
}
