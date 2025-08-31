import { Component, inject, ViewChild} from '@angular/core';
import { RoomService } from '../../services/room.service';
import { RoomModel } from '../../model/room';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MaterialModule } from '../../material/material.module';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoomDialogComponent } from './room-dialog/room-dialog.component';

@Component({
    selector: 'app-room',
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
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent {

    dataSource: MatTableDataSource<RoomModel>;
    displayedColumns: string[] = ['number', 'type', 'price', 'available', 'actions'];

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;
    
    private roomService = inject(RoomService);
    private dialog = inject(MatDialog);
    private snackbar = inject(MatSnackBar);

    private rooms: RoomModel[] = [];

    ngOnInit(): void {
        this.roomService.findAll().subscribe(data => this.createTable(data) );
        this.roomService.getRoomChange().subscribe(data => this.createTable(data));
        this.roomService.getMessageChange().subscribe(msg => this.snackbar.open(msg, 'INFO', { duration: 2000}));
    }

    createTable(data: RoomModel[]) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: any) {
        this.dataSource.filter = event.target.value;
    }

    openDigalog(room?: RoomModel){
        this.dialog.open(RoomDialogComponent, {
            width: '450px',
            data: room,
            disableClose: true
        });
    }
}
