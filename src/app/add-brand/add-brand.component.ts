import { Component, OnInit } from '@angular/core';
import { BrandService } from '../brand.service';
import { Brand } from '../modals/brand';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CREATE_BRAND } from '../reducers/brand.reducer';
import { AppState } from '../modals/app-state';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit {
  
  brands: any;
  auth: any;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private brandService: BrandService, public store: Store<AppState>) {
    
    this.brands = store.select('brands');
    this.auth = store.select('auth');

  }

  bannerFile: string;
  bannerFileSrc: any;
  brand: FormGroup;
  uploadError: boolean;
  newBrand: Brand;
  errorMessage: string;
  uploading: boolean;

  onSubmit({value, valid}: {value: Brand, valid: boolean}){
    if(!this.bannerFileSrc) {
      this.uploadError = true;
    }
    if(this.bannerFileSrc && value.name && value.link){
      this.uploadError = false;
      value.displayImg = this.bannerFileSrc;

      this.brandService.addBrand(value) 
                       .subscribe(
                        newBrand => {
                        this.store.dispatch({ type: CREATE_BRAND, payload: newBrand });
                        
                        this.router.navigate(['/admin']);
                       },
                         error => {
                          this.errorMessage = <any>error
                       });
    }
   
  }

  onBannerChange(event) {

    if(!event.srcElement.files[0]){
      return;
    }

    this.uploadError = false;
    this.uploading = true;
    this.bannerFile = '';
    this.bannerFileSrc = '';

    this.brandService.upload(event.srcElement).then((data)=> {      
      this.bannerFileSrc = data;
      this.bannerFileSrc = this.bannerFileSrc.fileName;
      this.bannerFile = event.srcElement.files[0].name;
      this.uploading = false;
    })
    .catch((err)=> {
      console.log(err)
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
