import { Component, OnInit } from '@angular/core';
import { BrandService } from '../brand.service';
import { EmitterService } from '../emitter.service';
import { Brand } from '../brand';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {

  constructor(private fb: FormBuilder, private brandService: BrandService) { }

  bannerFile: string;
  bannerFileSrc: any;
  brand: FormGroup;
  uploadError: boolean;
  newBrand: Brand;
  errorMessage: string;

  onSubmit({value, valid}: {value: Brand, valid: boolean}){
    if(this.bannerFileSrc && value.name && value.link){
      this.uploadError = false;
      value.displayImg = this.bannerFileSrc;
      
      console.log(value);
      this.brandService.addBrand(value) 
                       .subscribe(
                       newBrand  => this.newBrand = newBrand,
                       error =>  this.errorMessage = <any>error);

    }
    else {
      this.uploadError = true;
    }
   
  }


  onBannerChange(event) {
    this.uploadError = false;
    this.bannerFile = '';
    this.bannerFileSrc = '';

    this.brandService.upload(event.srcElement).then((data)=> {      
      this.bannerFileSrc = data;
      this.bannerFileSrc = this.bannerFileSrc.fileName;
      this.bannerFile = event.srcElement.files[0].name;
    })
    .catch((err)=> {
      this.uploadError = true;
      alert('Please upload an image file, less than 10MB!');
    });

  }

  ngOnInit() {

    this.uploadError = false;

    this.brand = this.fb.group ({
      name: ['', Validators.required],
      displayImg: ['', Validators.required],
      link: ['', Validators.required],
    })
  }

}
