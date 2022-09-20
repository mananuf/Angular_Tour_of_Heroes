import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from 'src/app/Services/hero.service';
import { HeroInterface } from '../heroes/hero-interface';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  // gets input from HeroComponent
  @Input() selected_hero?:HeroInterface;
  hero: HeroInterface | undefined;
  constructor(
    private route: ActivatedRoute,  
    private location:Location,  
    private heroService: HeroService
    ) { }

    ngOnInit(): void {
      this.getHero();
    }

    getHero(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.heroService.getHero(id)
        .subscribe(data => this.hero = data);
    }

    goBack(): void{
      this.location.back();
    }

    // edit & save hero
    save(){
      if(this.hero){
        this.heroService.updateHero(this.hero).subscribe(() => this.goBack())
      }
      
    }
  

}
