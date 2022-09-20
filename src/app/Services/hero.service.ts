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

  constructor(
    private messagesService: MessagesService, 
    private http: HttpClient
    ) { }

    // get heroes from server
  getHeroes(): Observable <HeroInterface[]>{
    this.messagesService.add('Heroes loaded successfully!') // display this message
    return this.http.get<HeroInterface[]>(this.heroesURL);
  }

  getHero(id:number): Observable<HeroInterface>{
    const hero = Heroes.find(h => h.id === id)!;
    this.messagesService.add(`fetched: ${hero.name} Details`)
    return of(hero);
  }

}
