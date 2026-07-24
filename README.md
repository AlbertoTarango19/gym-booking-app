# Gym Booking App

Aplicación en Angular para reservar clases de gimnasio.

## Instalación

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar la aplicación:

```bash
npm start
```

3. Abrir en el navegador:

```text
http://localhost:4200
```

## Entorno

- Node.js: v20.18.0
- npm: 10.8.2
- Angular CLI: ^19.2.26
- Angular: ^19.2.0
- TypeScript: ~5.7.2

## Arquitectura de componentes

La aplicación usa componentes independientes y responsables por separado:

- `AppComponent` / `HomeComponent`: controla el layout principal, el estado de la aplicación, la carga de datos, el filtrado y el tema.
- `BookingListComponent`: muestra el listado de clases disponibles como tarjetas.
- `BookingDetailComponent`: muestra el detalle de la clase seleccionada y expone el evento de reserva.

### Comunicación entre componentes

Se usa comunicación padre-hijo con `@Input()` y `@Output()`:

- `HomeComponent` pasa la lista filtrada de reservas y el ID de la clase seleccionada a `BookingListComponent`.
- `BookingListComponent` emite `selectBooking` cuando el usuario selecciona una tarjeta.
- `HomeComponent` pasa la clase seleccionada y el mensaje de confirmación a `BookingDetailComponent`.
- `BookingDetailComponent` emite `reserveBooking` cuando el usuario solicita reservar.

Esta opción permite mantener las responsabilidades separadas y un flujo de datos claro.

## Simulación de API

El servicio `BookingService` se usa como un mock inyectable (`providedIn: 'root'`).

- `getBookings()` retorna un `Observable<Booking[]>` con `of(...)` y un `delay(300)`.
- `reserveBooking(id)` reduce `availableSpots` en la clase correspondiente y retorna el booking actualizado.

No se usa un backend real, pero el servicio está tipado y simula comportamiento asíncrono similar a una llamada HTTP.

## Funcionalidades implementadas

- Listado de clases disponibles.
- Búsqueda de clases por nombre, instructor u horario.
- Vista de detalle de la clase seleccionada.
- Reserva simulada con actualización de cupos.
- Tema claro/oscuro.
- Componentes standalone básicos.

## Nota

La aplicación ya compila correctamente. Existe una advertencia de presupuesto de tamaño CSS en `home.component.scss`, pero no impide la ejecución.

## Despliegue

Se realizó un deploy del sistema web diseñado.

https://gym-booking-system-psi.vercel.app/
