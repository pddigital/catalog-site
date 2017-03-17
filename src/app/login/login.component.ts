import { Component, OnInit } from '@angular/core';
import { BrandService } from '../brand.service';
import { Login } from '../login';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;

  onSubmit({value, valid}: {value: Login, valid: boolean}){
    console.log(value, valid);
  }


  constructor(private brandService: BrandService) { }

  ngOnInit() {

    this.login = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })

  }




}
