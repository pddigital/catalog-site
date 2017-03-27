import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'ng2-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ADD_BRANDS } from '../reducers/brand.reducer';
import { ADD_CATALOGS } from '../reducers/catalog.reducer';
import { AppState } from '../modals/app-state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  brands: any;
  catalogs: any;

  constructor(private router: Router, public store: Store<AppState>) { 
    this.brands = store.select('brands');
    this.catalogs = store.select('catalogs');
  }

  ngOnInit() {

        this.store.select('brands').subscribe(brands=>{
        this.brands = brands;
        })
      
        this.store.select('catalogs').subscribe(catalogs=>{
        this.catalogs = catalogs;
        })

  }

}
