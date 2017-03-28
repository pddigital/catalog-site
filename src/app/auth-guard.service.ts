import { Injectable } from '@angular/core';
import { BrandService } from './brand.service';
import { Store } from '@ngrx/store';
import { AppState } from './modals/app-state';

import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private brandService: BrandService, private router: Router, public store: Store<AppState>) {

     this.auth = store.select('auth');
    
  }

  auth: any;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
       
        this.store.select('login').subscribe(auth=>{
          this.auth = auth;
        })

        if (this.auth){
           return true;
        }
        else {
          this.router.navigate(['/login']);
            return false;
        }
  }

}
