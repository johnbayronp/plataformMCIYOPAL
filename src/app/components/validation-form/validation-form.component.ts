import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, Form } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { MiembrosmciService } from 'src/app/services/miembrosmci.service';
import { MiembrosInterface } from 'src/app/models/miembros.model';

export interface eventInterface {
  label: string;
  events: any[];
}

@Component({
  selector: 'app-validation-form',
  templateUrl: './validation-form.component.html',
  styleUrls: ['./validation-form.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ValidationFormComponent implements OnInit {
  asyncTabs: Observable<eventInterface[]>;
  constructor(private miembroService: MiembrosmciService) {
    this.asyncTabs = new Observable((observer: Observer<eventInterface[]>) => {
      setTimeout(() => {
        observer.next([
          {
            label: 'Reunion Familiar',
            events: [
              {
                idEvent: 1,
                title: 'Familiar Domingo 10 am',
                dateInit: '05/02/2021',
                endEvent: '12/02/2021',
                cupos: 98,
                asistentes: [
                  '110874619',
                  '912123123'
                ],
              },
              {
                idEvent: 2,
                title: 'Familiar Domingo 8 am',
                dateInit: '05/02/2021',
                endEvent: '12/02/2021',
                cupos: 100,
              },
            ],
          },
          {
            label: 'Somos uno',
            events: [
              {
                idEvent: 1,
                title: 'Reunion Somos uno',
                dateInit: '04/02/2021',
                endEvent: '11/02/2021',
                cupos: 100,
              },
            ],
          }
        ]);
      }, 1000);
    });
  }

  ngOnInit(): void {}

  userFinder: boolean = false;
  noRegister: boolean = false;
  consultado: boolean = false;

  /** Usuario encontrado */
  userActual : MiembrosInterface;

  idoc = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(11),
    Validators.pattern('^[0-9]*$'),
  ]);

  getErrorMessage() {
    if (this.idoc.hasError('required')) {
      return 'Debes ingresar tu numero de documento.';
    }
    if (this.idoc.hasError('maxlength')) {
      return 'El documento tiene mucho numeros, revisar el documento.';
    }
    if (this.idoc.hasError('pattern')) {
      return 'El documento no acepta letras.';
    }
    return this.idoc.hasError('minlength')
      ? 'Debes ingresar un documento valido.'
      : '';
  }

  /**Buscar el usuario */
  buscarUsuario() {
    var data = this.miembroService.verifyID(this.idoc.value);


    data.then((response) => {
      if (response === false) {
        this.noRegister = true;
        this.userFinder = false;
      } else {/* 
        this.find.push(response); */
        this.userActual = response;
        this.userFinder = true;
        this.noRegister = false;
        this.consultado = true; 
      }
    });
  }

  consultarOtro() {
    this.consultado = false;
    this.userFinder = false;
  }

  /** registrando  */
  registrando(eventoSelected) {
    alert('Se esta regitrando a la reunion ' + eventoSelected.title);
  }
}
