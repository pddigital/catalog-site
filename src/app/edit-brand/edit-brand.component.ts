import { Component, OnInit } from '@angular/core';
import { BrandService } from '../brand.service';
import { Brand } from '../modals/brand';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UPDATE_BRAND } from '../reducers/brand.reducer';
import { AppState } from '../modals/app-state';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {

  brands: any;
    auth: any;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private brandService: BrandService, public store: Store<AppState>) {
    
    this.brands = store.select('brands');
    this.auth = store.select('auth');

  }

  bannerFileSrc: any;
  brand: FormGroup;
  uploadError: boolean;
  newBrand: Brand;
  errorMessage: string;
  brandId: string;

  onSubmit({value, valid}: {value: Brand, valid: boolean}){
    if(!this.bannerFileSrc) {
      this.uploadError = true;
    }
    if(this.bannerFileSrc && value.name && value.link){
      this.uploadError = false;
      value.displayImg = this.bannerFileSrc;
      
      let updatedBrand;
      updatedBrand = value;
      updatedBrand._id = this.brandId;

      this.brandService.editBrand(updatedBrand, updatedBrand._id) 
                       .subscribe(
                        newBrand => {
                        this.store.dispatch({ type: UPDATE_BRAND, payload: updatedBrand });
                        
                        this.router.navigate(['/admin']);
                       },
                         error => {
                          this.errorMessage = <any>error
                       });
      
    }
   
  }


  onBannerChange(event) {
    this.uploadError = false;
    this.bannerFileSrc = '';

    this.brandService.upload(event.srcElement).then((data)=> {      
      this.bannerFileSrc = data;
      this.bannerFileSrc = this.bannerFileSrc.fileName;
    })
    .catch((err)=> {
      this.uploadError = true;
      alert('Please upload an image file, less than 10MB!');
    });

  }

  ngOnInit() {

        this.store.select('login').subscribe(auth=>{
        this.auth = true;
      })

      if(this.auth){

        let currentBrand;
        
        this.uploadError = false;

        this.store.select('brands').subscribe(brands=>{
        this.brands = brands;

        currentBrand = this.brands.filter((brand)=>{
          return brand._id === this.route.snapshot.params['id'];
        })

        currentBrand = currentBrand[0];

       })
        

        this.bannerFileSrc = currentBrand.displayImg;
        this.brandId = currentBrand._id

        this.brand = this.fb.group ({
          name: [currentBrand.name, Validators.required],
          displayImg: ['', Validators.required],
          link: [currentBrand.link, Validators.required],
        })
     
    }
    else {
       this.router.navigate(['/login']);
    }

  }
}
