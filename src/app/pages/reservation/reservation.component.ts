import { Component, inject, ViewChild } from '@angular/core';
import { ReservationService } from '../../services/reservation.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReservationModel } from '../../model/reservation';
import { MaterialModule } from '../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { ReservationDialogComponent } from './reservation-dialog/reservation-dialog.component';

@Component({
  selector: 'app-reservation',
  imports: [
    MaterialModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './reservation.component.html',
  styleUrl: './reservation.component.css'
})
export class ReservationComponent {
  
  dataSource: MatTableDataSource<ReservationModel>;
  displayedColumns: string[] = ['customerName', 'checkInDate', 'checkOutDate', 'roomId', 'actions'];
  
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  
  private reservationService = inject(ReservationService);
  private dialog = inject(MatDialog);
  private reservations: ReservationModel[] = [];

  ngOnInit(): void {
    this.reservationService.findAll().subscribe(data => this.createTable(data));
  }

  createTable(data: ReservationModel[]) {
    this.dataSource = new MatTableDataSource(data);
  }

  ngAfterViewInit(): void {
    if (this.reservations.length) {
        this.setDataSource();
    }
  }

  setDataSource() {
    this.dataSource = new MatTableDataSource(this.reservations);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
  applyFilter(event: any) {
    this.dataSource.filter = event.target.value;
  }

  openDigalog(reservation?: ReservationModel){
      this.dialog.open(ReservationDialogComponent), {
          width: '450px',
          data: reservation,
          disableClose: true
      };
  }

}
