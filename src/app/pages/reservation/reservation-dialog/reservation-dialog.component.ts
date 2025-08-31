import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialModule } from '../../../material/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { switchMap, tap } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { ReservationModel } from '../../../model/reservation';

@Component({
  selector: 'app-reservation-dialog',
    imports: [    
    MaterialModule,
    MatDialogModule,
    MatToolbarModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule
  ],
  templateUrl: './reservation-dialog.component.html',
  styleUrl: './reservation-dialog.component.css'
})
export class ReservationDialogComponent {
  reservation: ReservationModel;
  readonly data = inject<ReservationModel>(MAT_DIALOG_DATA);
  onInit() {
    this.reservation = this.data;
  }
}
