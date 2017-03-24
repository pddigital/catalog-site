import { Component, OnInit } from '@angular/core';
import { BrandService } from '../brand.service';
import { Login } from '../login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { LOGIN } from '../reducers/login.reducer';
import { AppState } from '../app-state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  auth: any;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private brandService: BrandService, public store: Store<AppState>) { 
      this.auth = store.select('login');
  }

  login: FormGroup;
  loginState: Login;
  errorMessage: string;

  onSubmit({value, valid}: {value: Login, valid: boolean}){
      console.log(value)
      this.brandService.authenticate(value) 
                       .subscribe(
                        login => {
                        if(login){
                           this.store.dispatch({ type: LOGIN });
                           this.router.navigate(['/admin']);
                        }
                        else if (!login) {
                          this.errorMessage = "Invalid login credentials!";
                        }
                       },
                         error => {
                          this.errorMessage = <any>error;
                       });

  }

  ngOnInit() {

      this.login = this.fb.group ({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })

  }




}
