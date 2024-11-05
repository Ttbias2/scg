import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-gameover',
  standalone: true,
  imports: [TranslateModule,RouterLink],
  templateUrl: './gameover.component.html',
  styleUrl: './gameover.component.css'
})
export class GameoverComponent implements OnInit{

  ganador:number = 0;

  constructor(private route:ActivatedRoute){

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {this.ganador = params['winner']})
  }

}
