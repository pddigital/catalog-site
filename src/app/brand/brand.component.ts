import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from '../modals/app-state';


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})

export class BrandComponent implements OnInit {

  brands: any;
  catalogs: any;
  currentCatalogs: any;
  currentBrand: any;
  brandId: any;

  constructor(private router: Router, private route: ActivatedRoute, public store: Store<AppState>) { 
     this.brands = store.select('brands');
     this.catalogs = store.select('catalogs');
  }

 ngOnInit() {

    console.log('this hit')

      this.brandId = this.route.params.subscribe(params => {
        
    
      this.store.select('brands').subscribe(brands=>{
        this.brands = brands;
        
        this.currentBrand = this.brands.filter((brand)=>{
          return brand.slug === params['slug'];
        })
        this.currentBrand = this.currentBrand[0];
 
      })


      this.store.select('catalogs').subscribe(catalogs=>{
        this.catalogs = catalogs;
        this.currentCatalogs = this.catalogs.filter((catalog)=>{
          return catalog.brand === this.currentBrand._id;
        })
      })
    })
  }
}