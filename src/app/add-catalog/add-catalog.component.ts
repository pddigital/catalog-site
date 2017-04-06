import { Component, OnInit } from '@angular/core';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { BrandService } from '../brand.service';
import { Catalog } from '../modals/catalog';
import { AppState } from '../modals/app-state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CREATE_CATALOG } from '../reducers/catalog.reducer';

@Component({
  selector: 'app-add-catalog',
  templateUrl: './add-catalog.component.html',
  styleUrls: ['./add-catalog.component.css']
})

export class AddCatalogComponent implements OnInit {

  brands: any;
  auth: any;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private brandService: BrandService, public store: Store<AppState>) {
        this.auth = store.select('auth');
        this.brands = store.select('brands');
  }

  thumbFile: string;
  thumbFileSrc: any;
  pdfFile: string;
  pdfFileSrc: any;
  pubDate: any;
  catalog: FormGroup;
  dateError: boolean;
  pdfError: boolean;
  imageError: boolean;
  brandError: boolean;
  nameError: boolean;
  newCatalog: any;
  errorMessage: string;
  uploading: boolean;
  pdfUploading: boolean;
  submitting: boolean;
  
  getFileExtension = (filename)=> {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }

  public myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm.dd.yyyy',
        showTodayBtn: true
  };


   onSubmit({value, valid}: {value: Catalog, valid: boolean}){
    if(!this.pubDate){
      this.dateError = true;

    }
    if(!this.thumbFileSrc){
      this.imageError = true;

    }
    if(!this.pdfFileSrc){
      this.pdfError = true;

    }
    if(!value.brand){
      this.brandError = true;

    }
    if(!value.catalogName){
      this.nameError = true;

    }
    if(value.brand && value.catalogName && this.thumbFileSrc && this.pdfFileSrc && this.pubDate){
      value.catalogThumb = this.thumbFileSrc;
      value.catalogPdf = this.pdfFileSrc;
      value.pubDate = this.pubDate;
      this.submitting = true;

      this.brandService.addCatalog(value) 
                       .subscribe(
                        newCatalog => {
                         this.store.dispatch({ type: CREATE_CATALOG, payload: newCatalog });
                         this.submitting = false;
                         this.router.navigate(['/admin']);
                       },
                         error => {
                          this.submitting = false;
                          this.errorMessage = <any>error
                       });

    }
  }

  onThumbChange(event) {

    if(!event.srcElement.files[0]){
      return;
    }

    this.imageError = false;
    this.thumbFile = '';
    this.thumbFileSrc = '';
    this.uploading = true;
    this.catalog.get('catalogThumb').disable()

    let ext = this.getFileExtension(event.srcElement.files[0].name);

    if(ext !== 'jpg' && ext !== 'JPG' && ext !=='png' && ext !== 'PNG'){
      this.imageError = true;
      return;
    }

    this.brandService.upload(event.srcElement).then((data)=> {      
      this.thumbFileSrc = data;
      this.thumbFileSrc = this.thumbFileSrc.fileName;
      this.thumbFile = event.srcElement.files[0].name;
      this.uploading = false;
      this.catalog.get('catalogThumb').enable()
    })
    .catch((err)=> {
      this.imageError = true;
      alert('Please upload an image file, less than 10MB!');
    }); 

  }

  onPdfChange(event) {

    if(!event.srcElement.files[0]){
      return;
    }

    this.pdfError = false;
    this.pdfFile = '';
    this.pdfFileSrc = '';
    this.pdfUploading = true;
    this.catalog.get('catalogPdf').disable()

    let ext = this.getFileExtension(event.srcElement.files[0].name);

    if(ext !== 'pdf' && ext !== 'PDF'){
      this.pdfError = true;
      return;
    }
  
    this.brandService.upload(event.srcElement).then((data)=> {   
      this.pdfFileSrc = data;
      this.pdfFileSrc = this.pdfFileSrc.fileName;
      this.pdfFile = event.srcElement.files[0].name;
      this.pdfUploading = false;
      this.catalog.get('catalogPdf').enable()
    })
    .catch((err)=> {
      this.pdfError = true;
      alert('Please upload an pdf file, less than 10MB!');
    }); 

  }

  onDateChanged(event: IMyDateModel) {
    this.pubDate = event.jsdate;
     // event properties are: event.date, event.jsdate, event.formatted and event.epoc
  }

  ngOnInit() {
        
       this.catalog = this.fb.group ({
        brand: ['', Validators.required],
        catalogName: ['', Validators.required],
        pubDate: ['', Validators.required],
        catalogThumb: ['', Validators.required],
        catalogPdf: ['', Validators.required]
      })

       this.store.select('brands').subscribe(brands=>{
        this.brands = brands;
      })

    }

  }