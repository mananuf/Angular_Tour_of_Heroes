import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HeroInterface } from '../components/heroes/hero-interface';
import { Heroes } from '../mock-heros';
import { MessagesService } from './messages.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesURL = 'http://localhost:3000/hereos'

  // log messages
  private log(message:string){
    return this.messagesService.add(`(LOG) ${message}`)
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  constructor(
    private messagesService: MessagesService, 
    private http: HttpClient
    ) { }

    // get heroes from server
  getHeroes(): Observable <HeroInterface[]>{
    this.messagesService.add('Heroes loaded successfully!') // display this message
    return this.http.get<HeroInterface[]>(this.heroesURL).pipe(
      catchError(this.handleError<HeroInterface[]>('getHeroes', []))
    );
  }

  getHero(id:number): Observable<HeroInterface>{
    const hero = Heroes.find(h => h.id === id)!;
    this.messagesService.add(`fetched: ${hero.name} Details`)
    return of(hero);
  }

}
