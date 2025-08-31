import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from '../../../material/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { RoomModel } from '../../../model/room';
import { RoomService } from '../../../services/room.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-room-dialog',
  imports: [    
    MaterialModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  templateUrl: './room-dialog.component.html',
  styleUrl: './room-dialog.component.css'
})
export class RoomDialogComponent {
  room: RoomModel;
  readonly data = inject<RoomModel>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<RoomDialogComponent>);

  private roomService = inject(RoomService);

  ngOnInit() {
    this.room = { ...this.data };
  }

  operate() {
    if(this.room != null && this.room.id > 0) {
      this.roomService.update(this.room.id, this.room)
      .pipe(
          switchMap( () => this.roomService.findAll()),
          tap(data => this.roomService.setRoomChange(data)),
          tap( () => this.roomService.setMessageChange('UPDATED!') )
      )
      .subscribe();
      this.close();
    }else {
      this.roomService.save(this.room)
      .pipe(
          switchMap( () => this.roomService.findAll()),
          tap(data => this.roomService.setRoomChange(data)),
          tap( () => this.roomService.setMessageChange('CREATED!') )
      )
      .subscribe();

      this.close();
    }
  }

  close() {
    this.dialogRef.close();
  }
}
