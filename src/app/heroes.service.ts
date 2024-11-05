import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Super } from './common/interfaseSup'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  
  constructor(private httpclient: HttpClient) {

  }


  getHeroesbyid(id: number): Observable<Super> {
    return this.httpclient.get<Super>(`https://www.superheroapi.com/api.php/44a35111f005af665f5395b1a30e865a/${id}`);
  }
}
