import {Injectable} from '@angular/core';
import {CLUBS} from "../mock-clubs";
import {Observable, of} from "rxjs";
import {MessageService} from "../messages/message.service";
import {Club} from "../club";

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private messageService : MessageService) {
  }

  getClubs(): Observable<Club[]> {
    const clubs = of(CLUBS);
    this.messageService.add('ClubService: fetched clubs');
    return clubs
  }

  getClub(id : number): Observable<Club>{
    // For now, assume that a club with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const club = CLUBS.find(h => h.id === id)!;
    this.messageService.add(`Club-Service: fetched club id = ${id}`);
    return of(club);
  }
}
