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
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  isDarkTheme = true;
  bookings: Booking[] = [];
  selectedBooking?: Booking;
  searchTerm = '';
  loading = true;
  reservationMessage = '';

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.loading = true;
    this.bookingService.getBookings().subscribe((bookings) => {
      this.bookings = bookings;
      this.loading = false;
    });
  }

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

  selectBooking(booking: Booking): void {
    this.selectedBooking = booking;
    this.reservationMessage = '';
  }

  reserveBooking(): void {
    if (!this.selectedBooking) {
      return;
    }

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
        ? 'Reserva simulada con éxito. Tu cupo está apartado.'
        : '¡Último cupo tomado! Revisa otra clase disponible.';
    });
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    document.documentElement.classList.toggle('dark-theme', this.isDarkTheme);
    document.documentElement.classList.toggle('light-theme', !this.isDarkTheme);
  }

  trackByBooking(_: number, booking: Booking): number {
    return booking.id;
  }
}
