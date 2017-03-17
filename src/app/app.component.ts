import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  hideMenu: boolean;


  constructor() {

    this.hideMenu = true;
  }

  toggleHamburger(){
    this.hideMenu = !this.hideMenu;
  }

}
