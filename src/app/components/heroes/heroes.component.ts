import { Component, Input, OnInit } from '@angular/core';
import { HeroInterface } from './hero-interface';
import { Heroes } from 'src/app/mock-heros';
import { HeroService } from 'src/app/Services/hero.service';
import { MessagesService } from 'src/app/Services/messages.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  selected_hero?: HeroInterface;

  heroes?: HeroInterface[];

  constructor(private heroService: HeroService, private messagesService: MessagesService) { }
  ngOnInit(): void {
    this.getHeroes()
  }
  
  getHeroes(){
    this.heroService.getHeroes().subscribe((data)=> this.heroes = data)
  }
  onSelect(hero:HeroInterface){
    this.selected_hero = hero
    this.messagesService.add(`Selected: ${hero.name}`)
    // console.log(this.selected_hero)
  }
  
  
  

}