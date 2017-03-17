import { Component, OnInit } from '@angular/core';

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
  }

}
