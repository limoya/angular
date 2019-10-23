import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  //Subject 既是可观察对象的数据源，本身也是 Observable。 你可以像订阅任何 Observable 一样订阅 Subject。
  // 你还可以通过调用它的 next(value) 方法往 Observable 中推送一些值
  private searchTerms = new Subject<string>();

  constructor(private heroService:HeroService) { }

  // Push a search term into the observable stream
  search(term:string): void{
    // debugger
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      //每次间隔300ms
      debounceTime(300),
      // 输入值和上次一样时忽略不动
      distinctUntilChanged(),
      //输入值变了的时候，把查找的 observable 更新成新值(取消和舍弃以前的请求，但不是中止，是拿来数据但是不要了)
      switchMap((term:string)=>this.heroService.searchHeroes(term)),
    )
  }

}
