import { Component, OnInit, } from '@angular/core';
import { FormControl, Validators, Form } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { MiembrosmciService } from 'src/app/services/miembrosmci.service';
import { MiembrosInterface } from 'src/app/models/miembros.model';
import { EventosService } from 'src/app/services/eventos.service';
import { eventInterface } from 'src/app/models/event.model';



@Component({
  selector: 'app-validation-form',
  templateUrl: './validation-form.component.html',
  styleUrls: ['./validation-form.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ValidationFormComponent implements OnInit {
  asyncTabs: eventInterface[];
  notEvent: boolean;


  constructor(private miembroService: MiembrosmciService, private eventos: EventosService) {
    
  }

  ngOnInit(): void {


    /*Consultar todos los eventos disponibles */
    let res = this.eventos.searchEventos();

    res.then(
      result => {
        if(!result){
          return this.notEvent = true;
        }
        this.notEvent = false;
        return this.asyncTabs = result;
      }
    ).catch(
      err => console.log(err)
    );

  }

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
