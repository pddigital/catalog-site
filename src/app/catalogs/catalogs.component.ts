import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../modals/app-state';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-catalogs',
  templateUrl: './catalogs.component.html',
  styleUrls: ['./catalogs.component.css']
})
export class CatalogsComponent implements OnInit {

  brands: any;
  catalogs: any;
  auth: any;
  brandName: string;
  theseCatalogs: any;

  constructor(private router: Router, public store: Store<AppState>, private route: ActivatedRoute) {

    this.brands = store.select('brands');
    this.catalogs = store.select('catalogs');
    this.auth = store.select('auth');

   }

  ngOnInit() {
    
        this.store.select('brands').subscribe(brands=>{
        this.brands = brands;

        let brandName = this.brands.filter((brand)=>{
          return brand._id === this.route.snapshot.params['id'];
        })

        brandName = brandName[0].name;
        this.brandName = brandName;

      })
        this.store.select('catalogs').subscribe(catalogs=>{
        this.catalogs = catalogs;

        let theseCatalogs = this.catalogs.filter((catalog)=>{
          return catalog.brand === this.route.snapshot.params['id'];
        })
        
        this.theseCatalogs = theseCatalogs;
      
      })
    }

}


