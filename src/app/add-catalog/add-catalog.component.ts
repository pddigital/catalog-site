import { Component, OnInit } from '@angular/core';
import {IMyOptions, IMyDateModel} from 'mydatepicker';
import { BrandService } from '../brand.service';
import { EmitterService } from '../emitter.service';
import { Catalog } from '../catalog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-catalog',
  templateUrl: './add-catalog.component.html',
  styleUrls: ['./add-catalog.component.css']
})

export class AddCatalogComponent implements OnInit {

  constructor(private fb: FormBuilder, private brandService: BrandService) {}

  thumbFile: string;
  pdfFile: string;
  pubDate: any;
  catalog: FormGroup;
  uploadError: boolean;

  private myDatePickerOptions: IMyOptions = {
        // other options...
        dateFormat: 'mm.dd.yyyy',
        showTodayBtn: true
  };


   onSubmit({value, valid}: {value: Catalog, valid: boolean}){
    console.log(value);
  }

  onThumbChange(event) {
    this.thumbFile = event.srcElement.files[0].name;
  }

  onPdfChange(event) {
    this.pdfFile = event.srcElement.files[0].name;
  }

  onDateChanged(event: IMyDateModel) {
    this.pubDate = event.jsdate;
    console.log(this.pubDate);
     // event properties are: event.date, event.jsdate, event.formatted and event.epoc
  }

  ngOnInit() {
    
    this.uploadError = false;


    this.catalog = this.fb.group ({
        
        brand: ['', Validators.required],
        catalogName: ['', Validators.required],
        pubDate: ['', Validators.required],
        catalogThumb: ['', Validators.required],
        catalogPdf: ['', Validators.required]
      })
    }

   

  }