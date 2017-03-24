import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BrandService } from '../brand.service';
import { Store } from '@ngrx/store';
import { ADD_BRANDS } from '../reducers/brand.reducer';
import { AppState } from '../app-state';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  brands: any;
  auth: any;

  constructor(private router: Router, private brandService: BrandService, public store: Store<AppState>) {

    this.brands = store.select('brands');
    this.auth = store.select('auth');
  }

   public itemStringsLeft: any[] = [
    {
      catalogId: 'enrospring2017',
      catalogName: 'Enro Spring 2017'
    },
    {
      catalogId: 'enrofall2016',
      catalogName: 'Enro Fall 2016'
    },
    {
      catalogId: 'enrospring2016',
      catalogName: 'enrospring2016'
    },
    {
      catalogId: 'enrofall2015',
      catalogName: 'Enro Fall 2015'
    }
  ];

  errorMessage: string;

  ngOnInit() {

       this.store.select('login').subscribe(auth=>{
        this.auth = auth;
      })

      if(this.auth){
        this.brandService.getEverything() 
                        .subscribe(
                          everything => {
                          this.store.dispatch({ type: ADD_BRANDS, payload: everything.brands });
                        },
                          error => {
                            this.errorMessage = <any>error;
                        });
        this.store.select('brands').subscribe(brands=>{
        this.brands = brands;
      })
    }
    else {
       this.router.navigate(['/login']);
    }

  }

}
