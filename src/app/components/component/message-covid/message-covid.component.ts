import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalOptions,
  NgbModalRef,
} from '@ng-bootstrap/ng-bootstrap';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MiembrosInterface } from 'src/app/models/miembros.model';
import {eventInterface} from 'src/app/models/event.model';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-message-covid',
  templateUrl: './message-covid.component.html',
  styleUrls: ['./message-covid.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MessageCovidComponent implements OnInit {
  labelPosition: 'si' | 'no' = 'no';

  closeResult: string;
  modalOptions: NgbModalOptions;
  modal: NgbModalRef;
  registrado:boolean;
  cupo:boolean;
  
  covid1: FormGroup;
  covid2: FormGroup;
  covid3: FormGroup;

  @Input() asistente: MiembrosInterface;
  @Input() eventoActual : eventInterface;

  constructor(
    private modalService: NgbModal,
    private _route: ActivatedRoute,
    private _router: Router,
    private e:EventosService,
    private _fb: FormBuilder
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
    };

    (this.covid1 = this._fb.group({
      q1: new FormControl('', [Validators.required]),
    })),
      (this.covid2 = this._fb.group({
        q2: new FormControl('', [Validators.required]),
      })),
      (this.covid3 = this._fb.group({
        q3: new FormControl(''),
        q31: new FormControl(''),
        q32: new FormControl(''),
        q33: new FormControl(''),
        q34: new FormControl(''),
        qfinal: new FormControl('', [Validators.required]),
      }));
  }

  ngOnInit(): void {
    if(this.eventoActual.inscritos === this.eventoActual.capacidad){
      this.cupo = true;
    } 
    this.e.isRegister(this.eventoActual,this.asistente)
    .then(res => {
      if(res){
        this.registrado = true;
        return ;
      }
  });
  }

  open(content) {
    this.modal = this.modalService.open(content, this.modalOptions);
    this.modal.result.then(
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

  registro() {

    this.e.asistirEvento(
      this.eventoActual.id,
      this.asistente,
      this.covid1.value.q1,
      this.covid2.value.q2,
      this.covid3.value.qfinal
    );
    
    this.modal.close()
    this._router.navigate(['/registrado']);
  }
}
