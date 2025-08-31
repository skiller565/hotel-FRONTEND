import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { ReservationModel } from '../model/reservation';
import { environment } from '../../environments/environment.development';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService extends GenericService<ReservationModel> {
  protected override url: string = `${environment.HOST}/reservations`;

    private reservationChange: Subject<ReservationModel[]> = new Subject<ReservationModel[]>();
    private messageChange: Subject<string> = new Subject<string>();

    setReservationChange(reservations: ReservationModel[]){
      this.reservationChange.next(reservations);
    }

    getReservationChange(){
      return this.reservationChange.asObservable();
    }

    setMessageChange(message: string){
      this.messageChange.next(message);
    }

    getMessageChange(){
      return this.messageChange.asObservable();
    }

}
