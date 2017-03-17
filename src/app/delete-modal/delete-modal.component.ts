import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent {

  constructor() { }

  @ViewChild('childModal') public childModal:ModalDirective;

    public showChildModal():void {
      this.childModal.show();
    }

    public hideChildModal():void {
      this.childModal.hide();
    }

}
