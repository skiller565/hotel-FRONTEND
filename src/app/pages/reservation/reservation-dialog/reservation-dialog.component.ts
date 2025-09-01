import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from '../../../material/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { switchMap, tap, of, catchError } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ReservationModel } from '../../../model/reservation';
import { ReservationService } from '../../../services/reservation.service';
import { RoomModel } from '../../../model/room';
import { RoomService } from '../../../services/room.service';

@Component({
  selector: 'app-reservation-dialog',
    imports: [
    MaterialModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    ReactiveFormsModule
],
  templateUrl: './reservation-dialog.component.html',
  styleUrl: './reservation-dialog.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationDialogComponent {
  reservation: ReservationModel;
  rooms : RoomModel[];

  readonly data = inject<ReservationModel>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<ReservationDialogComponent>);

  private reservationService = inject(ReservationService);
  private roomService = inject(RoomService);

  ngOnInit(): void  {

    this.roomService.findAll().subscribe(data => this.rooms = data);
    this.reservation = { ...this.data };
  }

  operate() {
    if(this.reservation != null && this.reservation.id > 0) {
      this.reservationService.update(this.reservation.id, this.reservation)
      .pipe(
          switchMap( () => this.reservationService.findAll()),
          tap(data => this.reservationService.setReservationChange(data)),
          tap( () => this.reservationService.setMessageChange('UPDATED!') ),
          catchError(this.handleError('update'))
      )
      .subscribe({
        complete: () => {
          this.close();
        }
      });
    }else {
      this.reservationService.save(this.reservation)
      .pipe(
        switchMap( () => this.reservationService.findAll()),
          tap(data => this.reservationService.setReservationChange(data)),
          tap( () => this.reservationService.setMessageChange('CREATED!') ),
          catchError(this.handleError('create'))
      )
      .subscribe({
        complete: () => {
          this.close();
        }
      });
    }
  }

  close() {
    this.dialogRef.close();
  }

  private handleError(operation: string) {
  return (err: any) => {
    const errorMessage = err?.error?.message || `Unexpected error during ${operation}`;
    this.reservationService.setMessageChange(`ERROR: ${errorMessage}`);
    return of(); 
  };
}
}
