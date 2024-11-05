import { Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { PlayComponent } from './play/play.component';
import { SuperheroesComponent } from './superheroes/superheroes.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { LenguageComponent } from './lenguage/lenguage.component';
import { GameoverComponent } from './gameover/gameover.component';

export const routes: Routes = [
    {path:'menu',component:MenuComponent},
    {path:'play',component:PlayComponent},
    {path:'superheroes',component:SuperheroesComponent},
    {path:'tutorial',component:TutorialComponent},
    {path:'lenguage',component:LenguageComponent},
    {path:'gameover',component:GameoverComponent},
    {path:'gameover/:winner',component:GameoverComponent},
    {path:'',redirectTo:'/menu',pathMatch: 'full'}
];
