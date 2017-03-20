import { Component, OnInit } from '@angular/core';
import { BrandService } from '../brand.service';
import { EmitterService } from '../emitter.service';
import { Brand } from '../brand';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {

  bannerFile: string;

  constructor() { }

  onBannerChange(event) {
    this.bannerFile = event.srcElement.files[0].name;
  }

  ngOnInit() {

    this.brand = new FormGroup({
      name: new FormControl('', Validators.required),
      displayImg: new FormControl('', Validators.required),
      link: new FormControl('', Validators.required)
    })
  }



}
