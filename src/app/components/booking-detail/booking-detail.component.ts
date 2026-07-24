import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Booking } from '../../models/booking.model';

@Component({
  selector: 'app-booking-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent {
  @Input() selectedBooking?: Booking;
  @Input() reservationMessage = '';
  @Output() reserveBooking = new EventEmitter<void>();

  onReserve(): void {
    this.reserveBooking.emit();
  }
}
