import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BrandService } from '../brand.service';
import { Store } from '@ngrx/store';
import { AppState } from '../modals/app-state';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  brands: any;
  catalogs: any;
  auth: any;
  errorMessage: string;

  constructor(private router: Router, private brandService: BrandService, public store: Store<AppState>) {

    this.brands = store.select('brands');
    this.catalogs = store.select('catalogs');
    this.auth = store.select('login');
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
