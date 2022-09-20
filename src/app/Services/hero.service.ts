import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HeroInterface } from '../components/heroes/hero-interface';
import { MessagesService } from './messages.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesURL = 'http://localhost:3000/hereos'

  // define http header
  httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

  // log messages
  private log(message:string){
    return this.messagesService.add(`(HERO SERVICE) ${message}`)
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
    //this.messagesService.add('Heroes loaded successfully!') // display this message
    return this.http.get<HeroInterface[]>(this.heroesURL).pipe(
      tap(() => this.log('fetched successfully')),
      catchError(this.handleError<HeroInterface[]>('getHeroes', []))
    );
  }

  getHero(id:number): Observable<HeroInterface>{
    // const hero = Heroes.find(h => h.id === id)!;
    const id_url = `${this.heroesURL}/${id}`
    // this.messagesService.add(`fetched: ${hero.name} Details`)
    return this.http.get<HeroInterface>(id_url).pipe(
      tap(_ => this.log(`fetched id:${id} successfully`)),
      catchError(this.handleError<HeroInterface>(`getHero id=${id}`))
    )
  }

  /** PUT: update the hero on the server */
  updateHero(hero:HeroInterface): Observable<any>{
    return this.http.put(`${this.heroesURL}/${hero.id}`, hero, this.httpOptions).pipe(
      tap(() => this.log(`${hero.name} was updated successfully`)),
      catchError(this.handleError<any>(`error updating ${hero.name}`))
    )
  }

  // post new hero
  addHero(hero: HeroInterface): Observable<HeroInterface>{
    return this.http.post<HeroInterface>(this.heroesURL, hero, this.httpOptions).pipe(
      tap((newHero:HeroInterface)=> this.log(`successfully added new Hero ${newHero.name}`)),
      catchError(this.handleError<HeroInterface>(
        `failed to add hero ${hero.name}`
      ))
    )
  }

  // delete hero
  deleteHero(hero: HeroInterface): Observable<any>{
    return this.http.delete(`${this.heroesURL}/${hero.id}`,this.httpOptions).pipe(
      tap(() => this.log(`deleted ${hero.name} successfully`)),
      catchError(this.handleError('deleteHero'))
    )
  }

}
