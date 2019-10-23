import { Injectable } from '@angular/core';
import {Observable,of} from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
//catchError 捕获错误信息
import {catchError, map, tap} from 'rxjs/internal/operators';

import {Hero} from './hero';
import {MessageService} from './message.service';

const httpOptions = {
  headers: new HttpHeaders({'content-Type': 'application/json'}),
};

//意思是，这个类是依赖注入系统的参与者之一，heroservice是可注入的
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';
  constructor(
    private http: HttpClient,
    private messageService:MessageService,
  ) { }

  /*todo  为啥啊？？？？？*/
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        //todo 这里看语法，啥情况啊不知道啊
        tap(_=>this.log('fetched heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }
  getHero(id:number): Observable<Hero>{
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    //返回一个模拟英雄数据
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }
  updateHero(hero:Hero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_=>this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero')),
    );
  }
  addHero(hero:Hero): Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  deleteHero(hero:Hero): Observable<Hero>{
    const id:number = typeof hero === 'number' ? hero : hero.id;
    const url = this.heroesUrl + '/' + id;
    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  searchHeroes(term:string): Observable<Hero[]>{
    if(!term.trim()){
      //记得返回空数组的时候用[]；
      return of([]);
    }
    const url = `${this.heroesUrl}/?name=${term}`;
    return this.http.get<Hero[]>(url).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation',result?:T){
    return (error:any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }

  private log(message: string){
    this.messageService.add(message);
  }
}


