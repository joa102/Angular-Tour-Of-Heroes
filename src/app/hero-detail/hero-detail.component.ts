import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
// import { Superpower } from '../superpower';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.scss' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  // superpowers: Superpower[] = [];
  // superpower?:Superpower;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
    // this.hero?.superpower.push({id:3, name:'Otorgamiento de poderes 3'});
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  destroy(name: any): void {
    let index = this.hero?.superpower.findIndex(item => item.name === name);
    if(index! > -1){
      this.hero?.superpower.splice(index!, 1);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
