import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from '../modals/app-state';
import { BrandService } from '../brand.service';
import { ADD_BRANDS } from '../reducers/brand.reducer';
import { ADD_CATALOGS } from '../reducers/catalog.reducer';

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

  constructor(private router: Router, private route: ActivatedRoute, private brandService: BrandService, public store: Store<AppState>) { 
  
  }

 ngOnInit() {


        
      this.brandId = this.route.params.subscribe(params => {

        let brands = JSON.parse(localStorage.getItem("brands"));
        let catalogs = JSON.parse(localStorage.getItem("catalogs"));
      
        this.currentBrand = brands.filter((brand)=>{
        return brand.slug === params['slug'];

      })
        this.currentBrand = this.currentBrand[0];

          this.currentCatalogs = catalogs.filter((catalog)=>{
          return catalog.brand === this.currentBrand._id;
        })
  
 
      })




   }
      
}