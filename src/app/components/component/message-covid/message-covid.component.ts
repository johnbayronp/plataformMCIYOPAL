import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-message-covid',
  templateUrl: './message-covid.component.html',
  styleUrls: ['./message-covid.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MessageCovidComponent implements OnInit {
  labelPosition: 'si' | 'no' = 'no';

  title = 'ng-bootstrap-modal-demo';
  closeResult: string;
  modalOptions: NgbModalOptions;

  constructor(
    private modalService: NgbModal,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    };
  }

  ngOnInit(): void {}

  open(content) {
    this.modalService.open(content, this.modalOptions).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  registro(content) {
    
    this._router.navigate(['/registrado']);
  }
}
