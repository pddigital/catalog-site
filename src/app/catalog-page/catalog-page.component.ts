import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from '../modals/app-state';
import { DomSanitizer, SafeResourceUrl, SafeUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.css']
})
export class CatalogPageComponent implements OnInit {

  catalogs: any;
  currentCatalog: any;
  catalogId: any;

  constructor(private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute, public store: Store<AppState>) { }

  
  public innerHtml() {
          return this.sanitizer.bypassSecurityTrustHtml( 
              `<object data="${this.currentCatalog.catalogPdf}" type="application/pdf" style="width: 100%; height: 800px;"></object>`);
  }

  ngOnInit() {


      let catalogs = JSON.parse(localStorage.getItem("catalogs"));
        
        this.currentCatalog = catalogs.filter((catalog)=>{
          return catalog._id === this.route.snapshot.params['id'];
        })
        this.currentCatalog = this.currentCatalog[0];

  }

}
