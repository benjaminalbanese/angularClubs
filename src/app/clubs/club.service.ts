import {Injectable} from '@angular/core';
import {CLUBS} from "../mock-clubs";
import {Observable, of} from "rxjs";
import {MessageService} from "../messages/message.service";
import {Club} from "../club";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private clubsUrl = 'http://localhost:8080/getClubList'

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  private log(message: string) {
    this.messageService.add(`ClubService: ${message}`);
  }

  getClubs(): Observable<Club[]> {
    this.log('ClubService: fetching clubs');
    return this.http.get<Club[]>(this.clubsUrl);
  }

  getClub(id: number): Observable<Club> {
    // For now, assume that a club with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const club = CLUBS.find(h => h.id === id)!;
    this.log(`Club-Service: fetched club id = ${id}`)
    return of(club);
  }
}
