import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HeroInterface } from '../components/heroes/hero-interface';
import { Heroes } from '../mock-heros';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messagesService: MessagesService) { }

  getHeroes(): Observable <HeroInterface[]>{
    const heroes = of(Heroes)
    this.messagesService.add('Heroes loaded successfully!') // display this message
    return heroes;
  }

  getHero(id:number): Observable<HeroInterface>{
    const hero = Heroes.find(h => h.id === id)!;
    this.messagesService.add(`fetched: ${hero.name} Details`)
    return of(hero);
  }

}
