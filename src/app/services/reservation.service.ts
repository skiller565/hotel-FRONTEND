import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { ReservationModel } from '../model/reservation';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ReservationService extends GenericService<ReservationModel> {
  protected override url: string = `${environment.HOST}/reservations`;

}
