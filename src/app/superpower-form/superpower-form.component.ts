import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-superpower-form',
  templateUrl: './superpower-form.component.html',
  styleUrls: ['./superpower-form.component.scss']
})
export class SuperpowerFormComponent implements OnInit {

  angForm!: FormGroup;
  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.formBuilder.group({
      id: 0,
      superpower_name: ''
    });
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  onSubmit(): void {
    // const id = Number(this.route.snapshot.paramMap.get('id'));
    // this.hero?.superpower.push( { name: this.angForm.value.superpower_name } );
    // this.goBack();
    this.save();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this.location.back();
  }

}
