import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isDarkTheme = true;
  bookings: Booking[] = [];

  constructor(private bookingService: BookingService) {
    this.bookings = this.bookingService.getBookings();
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.documentElement.classList.toggle('dark-theme', this.isDarkTheme);
    document.documentElement.classList.toggle('light-theme', !this.isDarkTheme);
  }

  trackByBooking(_: number, booking: Booking): number {
    return booking.id;
  }
}
