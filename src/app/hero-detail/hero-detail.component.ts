import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
// import { Superpower } from '../superpower';
import { HeroService } from '../hero.service';
import { Superpower } from '../superpower';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.scss' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
  // superpowers: Superpower[] = [];
  power?:Superpower;
  image?: String;

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
      .subscribe(hero => {
        this.hero = hero;
        this.getImage();
      });
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

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

  // --------------------------------------------------

  newSuperpower(): void {
    if(this.hero?.superpower != undefined){
      this.hero?.superpower?.push({id:1, name:''});
      return;
    }
    this.hero!.superpower = [{id:1, name:''}];
  }

  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.heroService.addHero({ name } as Hero)
  //     .subscribe(hero => {
  //       this.heroes.push(hero);
  //     });
  // }

  // rmSuperpower(power: string): void {
  delete2(power: Superpower): void {
    this.hero?.superpower?.forEach((element,index)=>{
      // if(element.name==power) this.hero?.superpower?.splice(index,1);
      if(element==power) this.hero?.superpower?.splice(index,1);
   });
  }

  // delete(hero: Hero): void {
  //   this.heroes = this.heroes.filter(h => h !== hero);
  //   this.heroService.deleteHero(hero.id).subscribe();
  // }

  delete(power: Superpower): void {
    this.hero!.superpower = this.hero!.superpower.filter(p => p !== power);
    this.heroService.deleteSuperpower(power.id).subscribe();
  }

  getImage(): void {
    this.heroService.getImage(this.hero!)
      .subscribe( (json:any) => {
        let urlImage = json.data.results[0].thumbnail.path+"."+json.data.results[0].thumbnail.extension;
        this.image = urlImage.replace('http','https');
      });
  }

}
