import { Injectable } from '@angular/core';
import {Observable,of} from "rxjs/index";
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/internal/operators";

import {Hero} from "./hero";
import {MessageService} from "./message.service";

const httpOptions = {
  headers: new HttpHeaders({'content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroUrl = 'api/heroes';
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) { }

  getHeroes(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.heroUrl)
      .pipe(
        tap(_=>this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes',[])),
      );
  }

  getHero(hero): Observable<Hero>{
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = this.heroUrl + '/' + id;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_=>this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero  id=${id}`,[])),
      );
  }

  addHero(hero:Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroUrl, hero,httpOptions)
      .pipe(
        tap(newHero=> this.log(`added hero id=${newHero.id}`)),
        catchError(this.handleError<Hero[]>('addHero'))
      );
  }

  private handleError<T>(operation='operation',result?:T){
    return (error:any): Observable<T>=>{
      console.log(error);
      this.log(`${operation} failed ${error.message}`);
      return of(result as T);
    }
  }

  private log(message:string){
    this.messageService.add(message);
  }
}
