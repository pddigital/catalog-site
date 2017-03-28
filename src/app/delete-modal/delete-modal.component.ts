import { Component, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { BrandService } from '../brand.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { DELETE_CATALOG } from '../reducers/catalog.reducer';
import { AppState } from '../modals/app-state';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {

  constructor(private router: Router, private route: ActivatedRoute, private brandService: BrandService, public store: Store<AppState>) { }

  @ViewChild('childModal') public childModal:ModalDirective;

  @Input() catalogId: string;

  errorMessage: any;

    public showChildModal():void {
      this.childModal.show();
    }

    public hideChildModal():void {
      this.childModal.hide();
    }

    public deleteCatalog():void{
           this.brandService.removeCatalog(this.catalogId) 
                       .subscribe(
                        deletedCatalog => {
                         this.store.dispatch({ type: DELETE_CATALOG, payload: deletedCatalog });
                         this.childModal.hide();
                       },
                         error => {
                          this.errorMessage = <any>error
                       });
    }

}
