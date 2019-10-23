import { Component, OnInit } from '@angular/core';
import {Input,Output, EventEmitter} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

import {Hero} from "../hero";
import {HeroService} from "../hero.service";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  @Input() heroId;
  @Input() hero: Hero;
  @Output() detailEmit = new EventEmitter();
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getHero();
  }
  getHero(){
    const id = this.getHeroId();
    this.heroService.getHero({id} as Hero)
      .subscribe(hero => this.hero = hero);
  }

  getHeroId(): number{
    return +this.route.snapshot.paramMap.get('id');
  }
  emitToParent():void{
    debugger
    const id = this.getHeroId();
    this.detailEmit.emit('detail:' + id);
  }

  goBack(){
    this.location.back();
  }
}
