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
  slug: string;
  brandName: string;

  constructor(private router: Router, private route: ActivatedRoute, private brandService: BrandService, public store: Store<AppState>) { 
  
  }

 ngOnInit() {



      this.store.select('brands').subscribe(brands=>{
                this.brands = brands;

            this.store.select('catalogs').subscribe(catalogs=>{
                this.catalogs = catalogs;

                
              this.brandId = this.route.params.subscribe(params =>{
                    this.slug = params['slug'];

                    this.currentBrand = this.brands.filter(brand =>{
                       return brand.slug === this.slug;
                    })

                    if(this.currentBrand[0]){
                      this.brandName = this.currentBrand[0].name;
                    }

                    this.currentCatalogs = this.catalogs.filter(catalog =>{

                      return catalog.brand === this.currentBrand[0]._id;

                    })

                    this.currentCatalogs = this.currentCatalogs.sort((a, b)=>{
                          a = new Date(a.pubDate);
                          b = new Date(b.pubDate);
                          return a>b ? -1 : a<b ? 1 : 0;
                    });
                      

              })

          
            })
             
      })
    


   }
      
}