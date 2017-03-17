import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.css']
})
export class EditBrandComponent implements OnInit {

  bannerFile: string;

  constructor() { }

  onBannerChange(event) {
    this.bannerFile = event.srcElement.files[0].name;
  }

  ngOnInit() {
  }
}
