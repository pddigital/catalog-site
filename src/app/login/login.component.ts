import { Component, OnInit } from '@angular/core';
import { BrandService } from '../brand.service';
import { EmitterService } from '../emitter.service';
import { Login } from '../login';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private brandService: BrandService) { }

  login: FormGroup;
  loginState: Login;
  errorMessage: string;

  onSubmit({value, valid}: {value: Login, valid: boolean}){
      console.log(value)
      this.brandService.authenticate(value) 
                       .subscribe(
                       loginState  => this.loginState = loginState,
                       error =>  this.errorMessage = <any>error).then((stuff)=>{
                         console.log(stuff);
                       })

  }

  ngOnInit() {

      this.login = this.fb.group ({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })

  }




}
