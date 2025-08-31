import { Routes } from "@angular/router";
import { ReservationComponent } from "./reservation/reservation.component";
import { RoomComponent } from "./room/room.component";

export const pagesRoutes: Routes = [
    { path: 'room', component: RoomComponent},
    { path: 'reservation', component: ReservationComponent},
];