import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from '../../../material/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { RoomModel } from '../../../model/room';

@Component({
  selector: 'app-room-dialog',
  imports: [    
    MaterialModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule
  ],
  templateUrl: './room-dialog.component.html',
  styleUrl: './room-dialog.component.css'
})
export class RoomDialogComponent {
  room: RoomModel;
  readonly data = inject<RoomModel>(MAT_DIALOG_DATA);
  onInit() {
    this.room = this.data;
  }

}
