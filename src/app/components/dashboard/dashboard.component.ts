import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/Services/hero.service';
import { HeroInterface } from '../heroes/hero-interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes?: HeroInterface[] = [];
  constructor(private heroService: HeroService) { }

  getHeroes(){
    this.heroService.getHeroes().subscribe(data => this.heroes = data.slice(1,4));
  }

  ngOnInit(): void {
    this.getHeroes();
  }

}
