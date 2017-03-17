import { Component, OnInit } from '@angular/core';
import {IMyOptions, IMyDateModel} from 'mydatepicker';

@Component({
  selector: 'app-edit-catalog',
  templateUrl: './edit-catalog.component.html',
  styleUrls: ['./edit-catalog.component.css']
})
export class EditCatalogComponent implements OnInit {


    thumbFile: string;
    pdfFile: string;
    pubDate: any;

    private myDatePickerOptions: IMyOptions = {
          // other options...
          dateFormat: 'mm.dd.yyyy',
    };


    constructor() {

    }

    onThumbChange(event) {
      this.thumbFile = event.srcElement.files[0].name;
    }

    onPdfChange(event) {
      this.pdfFile = event.srcElement.files[0].name;
    }

    onDateChanged(event: IMyDateModel) {
       // event properties are: event.date, event.jsdate, event.formatted and event.epoc
    }

    ngOnInit() {
    }

}
