import { Component, inject, OnInit } from '@angular/core';
import { HeroesService } from '../heroes.service';
import { Super } from '../common/interfaseSup';
import { forkJoin, Observable } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'

@Component({
  selector: 'app-superheroes',
  standalone: true,
  imports: [TranslateModule,RouterLink],
  templateUrl: './superheroes.component.html',
  styleUrl: './superheroes.component.css'
})
export class SuperheroesComponent implements OnInit {

  start:number=1;
  end:number=15;

  supers:Super[]=[];

  translate: TranslateService = inject(TranslateService);

  constructor(private heroesService: HeroesService, private _matDialog:MatDialog) {
    
  }

  np()
  {
    this.start+=15;
    this.end+=15;

    this.getHeroes();
  }

  pp(){
    if(this.start!=1)
    {
      this.start-=15;
      this.end-=15; 
      
      this.getHeroes(); 
    }
    
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    const requests: Observable<Super>[] = [];

    this.supers = [];
  
    for (let i = this.start; i < this.end; i++) {
      requests.push(this.heroesService.getHeroesbyid(i));  
    }
  
    forkJoin(requests).subscribe(heroes => {
      this.supers.push(...heroes); 
      this.checkHeroes();
    });

    

  }

  checkHeroes() {
    this.supers.forEach((hero, index) => {
  
      hero.powerstats.intelligence = hero.powerstats.intelligence === "null" || hero.powerstats.intelligence === null ? 0 : hero.powerstats.intelligence;
      hero.powerstats.speed = hero.powerstats.speed === "null" || hero.powerstats.speed === null ? 0 : hero.powerstats.speed;
      hero.powerstats.strength = hero.powerstats.strength === "null" || hero.powerstats.strength === null ? 0: hero.powerstats.strength;

      hero.appearance.gender = hero.appearance.gender && hero.appearance.gender !== "null" ? hero.appearance.gender :this.translate.instant("unknow");
      hero.appearance.race = hero.appearance.race && hero.appearance.race !== "null" ? hero.appearance.race : this.translate.instant("unknow");
  
      hero.appearance.weight = hero.appearance.weight.map(w => 
        w === '- lb' ? '' : (w === '0 kg' ? this.translate.instant("unknow") : w)
      )
  
      hero.appearance.height = hero.appearance.height.map(h => 
        h === '-' ? '' : (h === '0 cm' ? this.translate.instant("unknow") : h)
      )

    });
  }

}
