import { Component, inject, ViewChild } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { RoomModel } from '../../model/room';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-room',
    imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule
],
    templateUrl: './room.component.html',
    styleUrls: ['./room.component.css']
})
export class RoomComponent {

    dataSource: MatTableDataSource<RoomModel>;
    displayedColumns: string[] = ['number', 'type', 'price', 'available', 'actions'];

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    
    private roomService = inject(RoomService);

    ngOnInit(): void {
        this.roomService.findAll().subscribe( data => {
            this.dataSource = new MatTableDataSource(data);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        });
    }

    applyFilter(event: any) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
