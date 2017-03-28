import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BrandService } from './brand.service';
import { Store } from '@ngrx/store';
import { AppState } from './modals/app-state';
import { ADD_BRANDS } from './reducers/brand.reducer';
import { ADD_CATALOGS } from './reducers/catalog.reducer';
import { LOGOUT } from './reducers/login.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  auth: any;
  hideMenu: boolean;
  brands: any;
  catalogs: any;
  errorMessage: string;

  constructor(private router: Router, private brandService: BrandService, public store: Store<AppState>) {

    this.brands = store.select('brands');
    this.catalogs = store.select('catalogs');
    this.auth = store.select('login');

    this.hideMenu = true;

  }

  toggleHamburger(){
    this.hideMenu = !this.hideMenu;
  }

  signOut(){
     this.brandService.logOut() 
                        .subscribe(
                          response => {
                          this.store.dispatch({ type: LOGOUT });
                          this.router.navigate(['/login']);
                        },
                          error => {
                            this.errorMessage = <any>error;
                        });
  }

  ngOnInit(){
     this.brandService.getEverything() 
                        .subscribe(
                          everything => {
                          this.store.dispatch({ type: ADD_BRANDS, payload: everything.brands });
                          this.store.dispatch({ type: ADD_CATALOGS, payload: everything.catalogs });
                        },
                          error => {
                            this.errorMessage = <any>error;
                        });
        
  
        this.store.select('login').subscribe(auth=>{
          this.auth = auth;
        })
    
        this.store.select('brands').subscribe(brands=>{
          this.brands = brands;
        })
      
        this.store.select('catalogs').subscribe(catalogs=>{
          this.catalogs = catalogs;
        })
      

  }

}
