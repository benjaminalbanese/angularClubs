import {Injectable} from '@angular/core';
import {catchError, Observable, of, tap} from "rxjs";
import {MessageService} from "../messages/message.service";
import {Club} from "../club";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private apiUrl = 'http://localhost:8080'
  private httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  private log(message: string) {
    this.messageService.add(`ClubService: ${message}`);
  }

  getClubs(): Observable<Club[]> {
    this.log('ClubService: fetching clubs');
    return this.http.get<Club[]>(this.apiUrl + '/getClubList').pipe(
      tap(_ => this.log('fetched clubs')),
      catchError(this.handleError<Club[]>('getClubs', [])
      ))
  }

  getClub(id: number): Observable<Club> {
    const url = `${this.apiUrl}/getClub?id=${id}`
    return this.http.get<Club>(url).pipe(
      tap(_ => {
        this.log(`fetch club with id ${id}`)
      }),
      catchError(this.handleError<Club>(`getClub id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Todo: send to the server
      console.error(error);
      // Todo better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`)
      return of(result as T);
    }
  }

  updateClub(club: Club) {
    const url = `${this.apiUrl}/updateClubJson`
    // the following is doing the same, just in uglier :)
    // const url = `${this.apiUrl}/updateClub?id=${club.id}&name=${club.name}&manager=${club.manager}&founded=${club.founded}`
    return this.http.put(url, club, this.httpOptions).pipe(
      tap(_ => this.log(`updated club id=${club.id}, new name=${club.name}`)),
      catchError(this.handleError<any>('updateClub'))
    )
  }

  addClub(club: Club) : Observable<Club> {
    return this.http.post<Club>(`${this.apiUrl}/addClub`, club, this.httpOptions).pipe(
      tap((club: Club) => this.log(`added hero w/ id=${club.id}`)),
      catchError(this.handleError<Club>('addClub'))
    )

  }
}
