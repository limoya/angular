import { Component, OnInit } from '@angular/core';

import {Hero} from '../hero';
import {HeroService} from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes : Hero[];

  //声明了一个私有的变量 heroService，且标记为 HeroService 的注入点
  constructor(private heroService: HeroService) { }


  //生命周期钩子，在组件创建完后很快就调用，放初始化逻辑的地方 因为上面有 onInit 所以这个函数必须有不能删
  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void{
    //subscribe函数 等待Observable发出英雄数组，传给回调函数，在这里赋给组件的heroes
    this.heroService.getHeroes().subscribe(heroes=>this.heroes = heroes);
  }
  add(name: string): void{
    name = name.trim();
    if(!name)return;
    this.heroService.addHero({name}as Hero)
      .subscribe(hero=>this.heroes.push(hero));
  }
  delete(hero: Hero): void{
    this.heroes = this.heroes.filter(h=>h!=hero);
    this.heroService.deleteHero(hero)
      .subscribe();
  }
  searchHeroes(hero: Hero): void{
    this.heroes = this.heroes.filter(h=>h!=hero);
    this.heroService.deleteHero(hero)
      .subscribe();
  }



  enterAdd(e,name:string):void{
    console.log(e);
    this.add(name);
  }

}
