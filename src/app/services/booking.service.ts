import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
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
      totalSpots: 20,
      description: 'Rutina funcional con ejercicios de fuerza y cardio para mejorar tu resistencia y técnica.'
    },
    {
      id: 2,
      className: 'Yoga',
      instructor: 'Stephanie Ortega',
      schedule: 'Martes · 18:30',
      availableSpots: 12,
      totalSpots: 25,
      description: 'Clase de Yoga suave enfocada en equilibrio, respiración y estiramientos profundos.'
    },
    {
      id: 3,
      className: 'Spinning',
      instructor: 'Romina Morales',
      schedule: 'Miércoles · 20:00',
      availableSpots: 8,
      totalSpots: 18,
      description: 'Entrenamiento de ciclismo indoor con intervalos intensos y música motivadora.'
    },
    {
      id: 4,
      className: 'Zumba',
      instructor: 'Jorge Valencia',
      schedule: 'Jueves · 17:00',
      availableSpots: 5,
      totalSpots: 22,
      description: 'Sesión de baile con pasos sencillos para quemar calorías y divertirte.'
    },
    {
      id: 5,
      className: 'Pilates',
      instructor: 'Andrea González',
      schedule: 'Viernes 18:30',
      availableSpots: 7,
      totalSpots: 15,
      description: 'Clase de Pilates para el fortalecimiento del core y la mejora de la postura.'
    },
    {
      id: 6,
      className: 'Boxeo',
      instructor: 'Carlos Mendoza',
      schedule: 'Sábado 10:00',
      availableSpots: 8,
      totalSpots: 15,
      description: 'Entrenamiento de técnica de boxeo combinado con ejercicios de potencia.'
    },
    {
      id: 7,
      className: 'HIIT',
      instructor: 'María Estrada',
      schedule: 'Domingo 09:00',
      availableSpots: 5,
      totalSpots: 10,
      description: 'Circuito rápido de alta intensidad para elevar tu ritmo cardiaco y quemar grasa.'
    }
  ];

  constructor() {}

  getBookings(): Observable<Booking[]> {
    return of(this.bookings.map((booking) => ({ ...booking }))).pipe(delay(300));
  }

  reserveBooking(bookingId: number): Observable<Booking | undefined> {
    return of(bookingId).pipe(
      delay(450),
      map((id) => this.bookings.find((booking) => booking.id === id)),
      tap((booking) => {
        if (booking && booking.availableSpots > 0) {
          booking.availableSpots -= 1;
        }
      }),
      map((booking) => (booking ? { ...booking } : undefined))
    );
  }
}
