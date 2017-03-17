import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public itemStringsLeft: any[] = [
    {
      catalogId: 'enrospring2017',
      catalogName: 'Enro Spring 2017'
    },
    {
      catalogId: 'enrofall2016',
      catalogName: 'Enro Fall 2016'
    },
    {
      catalogId: 'enrospring2016',
      catalogName: 'enrospring2016'
    },
    {
      catalogId: 'enrofall2015',
      catalogName: 'Enro Fall 2015'
    }
  ];


  constructor() {}

  ngOnInit() {
  }

}
