import { Component, OnInit } from '@angular/core';
import { IMyOptions, IMyDateModel } from 'mydatepicker';
import { BrandService } from '../brand.service';
import { Brand } from '../modals/brand';
import { Catalog } from '../modals/catalog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { UPDATE_CATALOG } from '../reducers/catalog.reducer';
import { AppState } from '../modals/app-state';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-catalog',
  templateUrl: './edit-catalog.component.html',
  styleUrls: ['./edit-catalog.component.css']
})
export class EditCatalogComponent implements OnInit {

  brands: any;
  catalogs: any;
  auth: any;

  constructor(private router: Router, private route: ActivatedRoute, private fb: FormBuilder, private brandService: BrandService, public store: Store<AppState>) {
        this.auth = store.select('auth');
        this.brands = store.select('brands');
        this.catalogs = store.select('catalogs');
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
  catalogId: string;
  startingDate: any;
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
      this.submitting = true;

      if(this.pubDate.date){
        this.pubDate.date.month = this.pubDate.date.month - 1;
        value.pubDate = moment(this.pubDate.date).toDate();
      }
      else {
        value.pubDate = this.pubDate;
      }
      

      let updatedCatalog;
      updatedCatalog = value;
      updatedCatalog._id = this.catalogId;
      

      this.brandService.editCatalog(updatedCatalog, updatedCatalog._id) 
                       .subscribe(
                        newCatalog => {
                         this.store.dispatch({ type: UPDATE_CATALOG, payload: updatedCatalog });
                         this.submitting = false;
                         this.router.navigate([`/catalogs/${value.brand}`]);
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
    this.startingDate = event.jsdate;
     // event properties are: event.date, event.jsdate, event.formatted and event.epoc
  }

  ngOnInit() {
        
      let currentCatalog;

      this.store.select('brands').subscribe(brands=>{
        this.brands = brands;
      })

      this.store.select('catalogs').subscribe(catalogs=>{

          this.catalogs = catalogs;

          currentCatalog = this.catalogs.filter((catalog)=>{
          return catalog._id === this.route.snapshot.params['id'];
        })

        currentCatalog = currentCatalog[0];
      })

        this.thumbFileSrc = currentCatalog.catalogThumb;
        this.pdfFileSrc = currentCatalog.catalogPdf;
        this.pdfFile = currentCatalog.catalogPdf;
        this.catalogId = currentCatalog._id;

        let thisDate = new Date(currentCatalog.pubDate);
        
        this.pubDate = {
          date: {
            month: thisDate.getMonth() + 1,
            day: thisDate.getDate(),
            year: thisDate.getFullYear()
          }
        }

        this.catalog = this.fb.group ({
        brand: [currentCatalog.brand, Validators.required],
        catalogName: [currentCatalog.catalogName, Validators.required],
        pubDate: ['', Validators.required],
        catalogThumb: ['', Validators.required],
        catalogPdf: ['', Validators.required]
      })

    }
  
}
