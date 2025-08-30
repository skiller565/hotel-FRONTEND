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

@Component({
    selector: 'app-room',
    imports: [
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

    private rooms: RoomModel[] = [];

    ngOnInit(): void {
        this.roomService.findAll().subscribe(data => {
            this.rooms = data;
            if (this.sort && this.paginator) {
                this.setDataSource();
            }
        });
    }

    ngAfterViewInit(): void {
        if (this.rooms.length) {
            this.setDataSource();
        }
    }

    setDataSource() {
        this.dataSource = new MatTableDataSource(this.rooms);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(event: any) {
        this.dataSource.filter = event.target.value;
    }
}
