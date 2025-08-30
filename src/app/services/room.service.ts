import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { RoomModel} from '../model/room';
import { GenericService } from './generic.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService extends GenericService<RoomModel> {

  protected override url: string = `${environment.HOST}/rooms`;
  
  private roomChange: Subject<RoomModel[]> = new Subject<RoomModel[]>();
  private messageChange: Subject<string> = new Subject<string>();
    setRoomChange(rooms: RoomModel[]){
      this.roomChange.next(rooms);
    }

    getRoomChange(){
      return this.roomChange.asObservable();
    }

    setMessageChange(message: string){
      this.messageChange.next(message);
    }

    getMessageChange(){
      return this.messageChange.asObservable();
    }
}
