import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RoomModel } from '../../../../model/room';
import { RoomService } from '../../../../services/room.service';

@Component({
	selector: 'app-dialog',
	imports: [
		MatDialogModule,
		MatToolbarModule,
		MatFormFieldModule,
		FormsModule,
		MatSelectModule,
		MatIconModule
	],
	templateUrl: './dialog.component.html',
	styleUrl: './dialog.component.css'
})
export class DialogComponent {
	room: RoomModel;

	readonly data = inject<RoomModel>(MAT_DIALOG_DATA);
	readonly dialogRef = inject(MatDialogRef<DialogComponent>);
	private roomService = inject(RoomService);

	ngOnInit(): void {
		this.room = { ... this.data };
	}
	close() {
		this.dialogRef.close();
	}
	operate() {
		/*if(this.medic != null && this.medic.idMedic > 0){
		  //UPDATE
		  this.medicService.update(this.medic.idMedic, this.medic)
		  .pipe(
			  switchMap( () => this.medicService.findAll()),
			  tap(data => this.medicService.setMedicChange(data)),
			  tap( () => this.medicService.setMessageChange('UPDATED!') )
			)
		  .subscribe();
		}else{
		  //SAVE
		  this.medicService.save(this.medic)
			.pipe(
			  switchMap( () => this.medicService.findAll()),
			  tap(data => this.medicService.setMedicChange(data)),
			  tap( () => this.medicService.setMessageChange('CREATED!') )
			)
		  .subscribe();
		}*/

		this.close();
	}

}
