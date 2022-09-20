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
  
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as HeroInterface)
      .subscribe(data => {
        this.heroes?.push(data);
      });
  }

  // delete hero
  delete(hero: HeroInterface):void{
    this.heroes = this.heroes?.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe()
  }
  
  

}
