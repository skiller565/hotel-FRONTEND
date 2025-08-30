import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoomComponent } from "./pages/room/room.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hotel-frontend');
}
