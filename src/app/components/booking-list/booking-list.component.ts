import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent {
  @Input() bookings: Booking[] = [];
  @Input() selectedBookingId?: number;
  @Input() loading = false;
  @Input() reservationMessage = '';
  @Output() selectBooking = new EventEmitter<Booking>();
  @Output() reserveBooking = new EventEmitter<number>();

  trackByBooking(_: number, booking: Booking): number {
    return booking.id;
  }

  onSelect(booking: Booking): void {
    this.selectBooking.emit(booking);
  }

  onReserve(id: number): void {
    this.reserveBooking.emit(id);
  }
}