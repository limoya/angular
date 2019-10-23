import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {Hero} from "../hero";
import {HeroService} from "../hero.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  newHero: string;
  constructor(
    private heroService: HeroService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void{
    this.heroService.getHeroes()
      .subscribe(heroes=>this.heroes = heroes);
  }

  add(name: string): void{
    name = name.trim();
    if(!name)return;
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => this.heroes.push(hero));
  }
  childEmit(e){
    console.log('子组件触发 - ',e);
  }

  godetail(hero:Hero):void{
    console.log(this.router, this.route);
    this.router.navigate(['/detail',hero.id]);
  }

  enterAdd(e,name:string): void{
    this.add(this.newHero);
    this.newHero = '';
  }

}
