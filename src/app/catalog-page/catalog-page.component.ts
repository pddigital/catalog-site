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
  id: string;
  catalogName: string;
  catalogPdf: string;
  catalogParams: any;

  constructor(private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute, public store: Store<AppState>) { }

  
  public innerHtml() {
          if(this.currentCatalog[0]){
                     return this.sanitizer.bypassSecurityTrustHtml( 
                     `<object data="${this.catalogPdf}" type="application/pdf" style="width: 100%; height: 800px;"></object>`);
          }
 
  }

  ngOnInit() {

    
        this.store.select('catalogs').subscribe(catalogs=>{
              this.catalogs = catalogs;

              this.catalogParams = this.route.params.subscribe(params =>{

                this.catalogId = params['id'];

                this.currentCatalog = this.catalogs.filter(catalog =>{
                  return catalog._id === this.catalogId;
                })

                if(this.currentCatalog[0]){
                  this.catalogPdf = this.currentCatalog[0].catalogPdf;
                  this.catalogName = this.currentCatalog[0].catalogName;
                }

              })
        })



  }

}
