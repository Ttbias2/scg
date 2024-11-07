import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../heroes.service';
import { Super } from '../common/interfaseSup';
import { forkJoin, Observable } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-play',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent implements OnInit {

  constructor(private heroesService: HeroesService, private translate: TranslateService,private router:Router) {

  }

  ngOnInit(): void {
    this.llenarDecks();
    this.deckPLayer = this.llenarDecks();
    this.deckPc = this.llenarDecks();
    console.log(this.deckPc);
    console.log(this.deckPLayer);
  }

  ban: number[] = [
    19, 21, 22, 50, 51, 54, 55, 67, 74, 85, 86, 89, 90,
    94, 101, 113, 116, 123, 124, 128, 131, 133, 134, 143,
    153, 159, 164, 166, 175, 182, 183, 184, 192, 199, 205,
    223, 243, 244, 250, 255, 262, 272, 283, 290, 291, 292,
    293, 301, 302, 318, 329, 362, 363, 377, 378, 411, 417,
    420, 434, 447, 453, 464, 465, 466, 482, 486, 501, 507,
    511, 512, 519, 534, 544, 552, 553, 554, 560, 593, 596,
    603, 606, 614, 616, 624, 626, 629, 662, 663, 669, 673,
    674, 682, 683, 691, 694, 698, 704, 710, 712, 715, 721,
    725, 621, 59
  ];

  deckPc: Super[] = [];
  deckPLayer: Super[] = [];

  playerHero: Super = {
    response: '',
    id: 0,
    name: '',
    powerstats: {
      intelligence: '0',
      strength: '0',
      speed: '0',
      durability: '0',
      power: '0',
      combat: '0'
    },
    biography: {
      "full-name": '',
      "alter-egos": '',
      aliases: [],
      "place-of-birth": '',
      "first-appearance": '',
      publisher: '',
      alignment: ''
    },
    appearance: {
      gender: '',
      race: '',
      height: ['', ''],
      weight: ['', ''],
      "eye-color": '',
      "hair-color": ''
    },
    work: {
      occupation: '',
      base: ''
    },
    connections: {
      "group-affiliation": '',
      relatives: ''
    },
    image: {
      url: ''
    }
  };
  pcHero: Super = {
    response: '',
    id: 0,
    name: '',
    powerstats: {
      intelligence: '0',
      strength: '0',
      speed: '0',
      durability: '0',
      power: '0',
      combat: '0'
    },
    biography: {
      "full-name": '',
      "alter-egos": '',
      aliases: [],
      "place-of-birth": '',
      "first-appearance": '',
      publisher: '',
      alignment: ''
    },
    appearance: {
      gender: '',
      race: '',
      height: ['', ''],
      weight: ['', ''],
      "eye-color": '',
      "hair-color": ''
    },
    work: {
      occupation: '',
      base: ''
    },
    connections: {
      "group-affiliation": '',
      relatives: ''
    },
    image: {
      url: ''
    }
  };

  pointsPc: number = 0;
  pointsPlayer: number = 0;
  round:number = 9;

  llenarDecks(): Super[] {

    let requests: Observable<Super>[] = [];

    let deck: Super[] = [];

    for (let i = 0; i < 9; i++) {
      requests.push(this.heroesService.getHeroesbyid(this.getRandomNumber()));
    }

    forkJoin(requests).subscribe(heroes => {
      deck.push(...heroes);
      deck = this.checkHeroes(deck);
    });


    return deck;

  }

  getRandomNumber(): number {

    let num: number;

    do {

      num = Math.floor(Math.random() * (732 - 1)) + 1;

    } while (this.ban.includes(num));

    return num;
  }

  checkHeroes(deck: Super[]): Super[] {
    deck.forEach((hero, index) => {

      hero.powerstats.intelligence = hero.powerstats.intelligence === "null" || hero.powerstats.intelligence === null ? 0 : hero.powerstats.intelligence;
      hero.powerstats.speed = hero.powerstats.speed === "null" || hero.powerstats.speed === null ? 0 : hero.powerstats.speed;
      hero.powerstats.strength = hero.powerstats.strength === "null" || hero.powerstats.strength === null ? 0 : hero.powerstats.strength;
    });

    return deck;
  }

  turn(indexCart: number, stat: number) {

    const rivalCart: number = Math.floor(Math.random() * (this.deckPc.length - 0)) + 1;
    const rivalStat: number = Math.floor(Math.random() * (3 - 0)) + 1;

    this.pcHero = this.deckPc[rivalCart];
    this.playerHero = this.deckPLayer[indexCart];

    const playerHeroElement = document.getElementById('playerHero');
    const pcHeroElement = document.getElementById('pcHero');
    const playerStatElement = document.getElementById('playerStat');
    const pcStatElement = document.getElementById('pcStat');

    if (playerHeroElement && pcHeroElement) {
      if (playerStatElement) {
        switch (stat) {
          case 1:
            playerStatElement.innerHTML = `<p style="background-color:red; margin-top: 1rem; border-radius: 0.5rem; padding: 0.5rem 1rem;">${this.translate.instant("str")}: ${this.playerHero.powerstats.strength}</p>`;
            break;
          case 2:
            playerStatElement.innerHTML = `<p style="background-color:aqua; margin-top: 1rem; border-radius: 0.5rem; padding: 0.5rem 1rem;">${this.translate.instant("int")}: ${this.playerHero.powerstats.intelligence}</p>`;
            break;
          case 3:
            playerStatElement.innerHTML = `<p style="background-color:burlywood; margin-top: 1rem; border-radius: 0.5rem; padding: 0.5rem 1rem;">${this.translate.instant("spd")}: ${this.playerHero.powerstats.speed}</p>`;
            break;
        }
      }

      if (pcStatElement) {
        switch (rivalStat) {
          case 1:
            pcStatElement.innerHTML = `<p style="background-color:red; margin-top: 1rem; border-radius: 0.5rem; padding: 0.5rem 1rem;">${this.translate.instant("str")}: ${this.pcHero.powerstats.strength}</p>`;
            break;
          case 2:
            pcStatElement.innerHTML = `<p style="background-color:aqua; margin-top: 1rem; border-radius: 0.5rem; padding: 0.5rem 1rem;">${this.translate.instant("int")}: ${this.pcHero.powerstats.intelligence}</p>`;
            break;
          case 3:
            pcStatElement.innerHTML = `<p style="background-color:burlywood; margin-top: 1rem; border-radius: 0.5rem; padding: 0.5rem 1rem;">${this.translate.instant("spd")}: ${this.pcHero.powerstats.speed}</p>`;
            break;
        }

      }

      if (playerHeroElement) {
        playerHeroElement.style.opacity = '1';
      }
      if (pcHeroElement) {
        pcHeroElement.style.opacity = '1';
      }

      playerHeroElement.classList.add('opacity-animation');
      pcHeroElement.classList.add('opacity-animation');

      setTimeout(() => {
        if (playerHeroElement) {
          playerHeroElement.classList.remove('opacity-animation');
        }
        if (pcHeroElement) {
          pcHeroElement.classList.remove('opacity-animation');
        }
      }, 1000);
    }

    this.deckPLayer = this.deckPLayer.filter(hero => hero.id !== this.deckPLayer[indexCart].id);
    this.deckPc = this.deckPc.filter(hero => hero.id !== this.deckPc[rivalCart].id);

    if (stat == rivalStat) {

      switch (stat) {
        case 1: {
          this.sameStat(this.playerHero.powerstats.strength, this.pcHero.powerstats.strength)
          break;
        }
        case 2: {
          this.sameStat(this.playerHero.powerstats.intelligence, this.pcHero.powerstats.intelligence)
          break;
        }
        case 3: {
          this.sameStat(this.playerHero.powerstats.speed, this.pcHero.powerstats.speed)
          break;
        }
      }

    }
    else if ((stat == 2 && rivalStat == 1) || (stat == 3 && rivalStat == 2) || (stat == 1 && rivalStat == 3)) {

      switch (stat) {
        case 1: {
          this.winStat(this.playerHero.powerstats.strength, this.pcHero.powerstats.speed)
          break;
        }
        case 2: {
          this.winStat(this.playerHero.powerstats.intelligence, this.pcHero.powerstats.strength)
          break;
        }
        case 3: {
          this.winStat(this.playerHero.powerstats.speed, this.pcHero.powerstats.intelligence)
          break;
        }
      }

    }
    else {

      switch (stat) {
        case 1: {
          this.loseStat(this.playerHero.powerstats.strength, this.pcHero.powerstats.intelligence)
          break;
        }
        case 2: {
          this.loseStat(this.playerHero.powerstats.intelligence, this.pcHero.powerstats.speed)
          break;
        }
        case 3: {
          this.loseStat(this.playerHero.powerstats.speed, this.pcHero.powerstats.strength)
          break;
        }
      }
    }

    this.round--;

    if(this.round==0){
      
      if(this.pointsPlayer>this.pointsPc){
        this.router.navigate(['gameover/0'])
      }
      else if(this.pointsPc>this.pointsPlayer){
        this.router.navigate(['gameover/1'])
      }
      else{
        this.router.navigate(['gameover/2'])
      }

    }

  }

  sameStat(playerStat: number | string, pcStat: number | string) {

    const playerValue = Number(playerStat);
    const pcValue = Number(pcStat);

    if (playerValue > pcValue) {
      this.pointsPlayer++;
    } else if (pcValue > playerValue) {
      this.pointsPc++;

    }
  }

  winStat(playerStat: number | string, pcStat: number | string) {

    const playerValue = Number(playerStat);
    const pcValue = Number(pcStat);

    const comparacion = pcValue - playerValue;

    if (comparacion > 29) {
      this.pointsPc++;

    } else {
      this.pointsPlayer++;

    }
  }

  loseStat(playerStat: number | string, pcStat: number | string) {

    const playerValue = Number(playerStat);
    const pcValue = Number(pcStat);

    const comparacion = playerValue - pcValue;

    if (comparacion > 29) {
      this.pointsPlayer++;

    } else {
      this.pointsPc++;
    }
  }



}
