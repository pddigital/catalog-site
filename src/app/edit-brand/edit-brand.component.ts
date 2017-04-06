import { Component, OnInit } from '@angular/core';
import { BrandService } from '../brand.service';
import { Brand } from '../modals/brand';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UPDATE_BRAND, DELETE_BRAND } from '../reducers/brand.reducer';
import { AppState } from '../modals/app-state';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {

  brands: any;
  catalogs: any;
  theseCatalogs: any;
  auth: any;
  uploading: boolean;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private brandService: BrandService, public store: Store<AppState>) {
    
    this.brands = store.select('brands');
    this.brands = store.select('catalogs');
    this.auth = store.select('auth');

  }

  bannerFileSrc: any;
  brand: FormGroup;
  uploadError: boolean;
  newBrand: Brand;
  errorMessage: string;
  brandId: string;
  submitting: boolean;

  onSubmit({value, valid}: {value: Brand, valid: boolean}){
    if(!this.bannerFileSrc) {
      this.uploadError = true;
    }
    if(this.bannerFileSrc && value.name && value.link){
      this.uploadError = false;
      value.displayImg = this.bannerFileSrc;
      this.submitting = true;
      let updatedBrand;
      updatedBrand = value;
      updatedBrand._id = this.brandId;

      this.brandService.editBrand(updatedBrand, updatedBrand._id) 
                       .subscribe(
                        newBrand => {
                        this.store.dispatch({ type: UPDATE_BRAND, payload: updatedBrand });
                        this.submitting = false;
                        this.router.navigate(['/admin']);
                       },
                         error => {
                          this.submitting = false;
                          this.errorMessage = <any>error
                       });
      
    }
   
  }


  onBannerChange(event) {
    if(!event.srcElement.files[0]){
      return;
    }
    this.uploadError = false;
    this.bannerFileSrc = '';
    this.uploading = true;
    this.brand.get('displayImg').disable();

    this.brandService.upload(event.srcElement).then((data)=> {      
      this.bannerFileSrc = data;
      this.bannerFileSrc = this.bannerFileSrc.fileName;
      this.uploading = false;
      this.brand.get('displayImg').enable()
    })
    .catch((err)=> {
      this.uploadError = true;
      alert('Please upload an image file, less than 10MB!');
    });

  }

  deleteBrand() {
         this.brandService.removeBrand(this.route.snapshot.params['id']) 
                       .subscribe(
                        deletedCatalog => {
                         this.store.dispatch({ type: DELETE_BRAND, payload: deletedCatalog });
                         this.router.navigate(['/admin']);
                       },
                         error => {
                          this.errorMessage = <any>error
                       });
  }


  ngOnInit() {

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

        this.store.select('catalogs').subscribe(catalogs=>{
        this.catalogs = catalogs;
        })

        let theseCatalogs = this.catalogs.filter((catalog)=>{
          return catalog.brand === this.route.snapshot.params['id'];
        })
        
        this.theseCatalogs = theseCatalogs;
     
    }
  
}
