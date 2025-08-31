import { Routes } from '@angular/router';
import { RoomComponent } from './pages/room/room.component';
import { ReservationComponent } from './pages/reservation/reservation.component';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
    {path: '', component: LayoutComponent},
    {path: 'pages/room', component: RoomComponent},
    {path: 'pages/reservation', component: ReservationComponent}
];
