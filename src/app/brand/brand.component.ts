import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandService } from '../brand.service';
import { Brand } from '../modals/brand';


@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})

export class BrandComponent implements OnInit {

  brandName =  this.route.snapshot.params['name'];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {


    console.log(this.route.snapshot.params['name']);
  }
}
