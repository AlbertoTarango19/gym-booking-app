import { Injectable } from '@angular/core';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookings: Booking[] = [
    {
      id: 1,
      className: 'CrossFit',
      instructor: 'Diego Mejía',
      schedule: 'Lunes · 07:00',
      availableSpots: 4,
      totalSpots: 20
    },
    {
      id: 2,
      className: 'Yoga',
      instructor: 'Stephanie Ortega',
      schedule: 'Martes · 18:30',
      availableSpots: 12,
      totalSpots: 25
    },
    {
      id: 3,
      className: 'Spinning',
      instructor: 'Romina Morales',
      schedule: 'Miércoles · 20:00',
      availableSpots: 8,
      totalSpots: 18
    },
    {
      id: 4,
      className: 'Zumba',
      instructor: 'Jorge Valencia',
      schedule: 'Jueves · 17:00',
      availableSpots: 5,
      totalSpots: 22
    },
    {
      id: 5,
      className: 'Pilates',
      instructor: 'Andrea González',
      schedule: 'Viernes 18:30',
      availableSpots: 7,
      totalSpots: 15
    },
    {
      id: 6,
      className: 'Boxeo',
      instructor: 'Carlos Mendoza',
      schedule: 'Sábado 10:00',
      availableSpots: 8,
      totalSpots: 15
    },
    {
      id: 7,
      className: 'HIIT',
      instructor: 'María Estrada',
      schedule: 'Domingo 09:00',
      availableSpots: 5,
      totalSpots: 10
    }
  ];

  constructor() {}

  getBookings(): Booking[] {
    return this.bookings;
  }
}
