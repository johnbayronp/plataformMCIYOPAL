import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Lideres } from 'src/app/models/lideres.model';
import { TypeDocumentos } from 'src/app/models/typeDocumentos.model';
import { MiembrosInterface } from 'src/app/models/miembros.model';
import { MiembrosmciService } from 'src/app/services/miembrosmci.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class RegisterComponent implements OnInit {
  datosPersonales: FormGroup;
  ministeriales: FormGroup;
  terminos: FormGroup;
  miembro: MiembrosInterface = {};
  validateRegister: boolean;

  categoryDocuments: TypeDocumentos[] = [
    { value: 'CE', viewValue: 'Cedula Extranjera'},
    { value: 'TI', viewValue: 'Tarjeta de identidad' },
    { value: 'PP', viewValue: 'Pasaporte' },
    { value: 'CC', viewValue: 'Cedula de Ciudadania' },
  ];

  lider12:Lideres[] = [
    { value: 'NaN', viewValue: 'ES PRIMERA VEZ EN ASISTIR'},
    { value: 'CAMILO & PAULA MURCIA', viewValue: 'CAMILO Y PAULA MURCIA'},
    { value: 'ALFONSO & ESTHER FRANCO', viewValue: 'ALFONSO & ESTHER FRANCO'},
    { value: 'CARLOS & EDNA JULA', viewValue: 'CARLOS & EDNA JULA'},
    { value: 'CESAR & NATALIA LEGUIZAMO', viewValue: 'CESAR & NATALIA LEGUIZAMO'},
    { value: 'DIEGO & YAMILE ZAPATA', viewValue: 'DIEGO & YAMILE ZAPATA'},
    { value: 'LUIS C. & MARILENY APONTE', viewValue: 'LUIS C. & MARILENY APONTE'},
    { value: 'LUIS & ELIZA CASTILLO', viewValue: 'LUIS & ELIZA CASTILLO'},
    { value: 'MANUEL & JOHANNA PATIÑO', viewValue: 'MANUEL & JOHANNA PATIÑO'},
    { value: 'OCTAVIO & LIVIA MEJIA', viewValue: 'OCTAVIO & LIVIA MEJIA'},
    { value: 'MERY SANCHEZ', viewValue: 'MERY SANCHEZ'},
    { value: 'GEOVANNY BECERRA', viewValue: 'GEOVANNY BECERRA'},
    { value: 'WILLIAM CORREA', viewValue: 'WILLIAM CORREA'},
    { value: 'PS. VICTOR & STELLA MURCIA', viewValue: 'PS. VICTOR & STELLA MURCIA'},
    { value: 'NUEVO', viewValue: 'SOY NUEVO ASISTO PRIMERA VEZ'},
    { value: 'OTROS', viewValue: 'OTROS'},
  ]

  constructor(
    private _fb: FormBuilder, 
    private miembroService: MiembrosmciService,
    private _route: ActivatedRoute, private _router: Router
    ) {

    this.datosPersonales = this._fb.group({
      tipoDoc: new FormControl('', [Validators.required]),
      idoc: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(14),
        Validators.pattern('^[0-9]*$'),
      ]),
      nombre: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      celular: new FormControl('', [Validators.required]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
    }),
    this.ministeriales = this._fb.group({
      
      genero: new FormControl('', [Validators.required]),
      edad: new FormControl('', [Validators.required]),
      lider: new FormControl('', [Validators.required])

    }),
    this.terminos = this._fb.group({
      accept: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {}

  verificarID(){
    console.log("verificando id...");

  }
  
  _onSubmit(){

    nombreSearch: new FormControl('', [Validators.required]),
    this.miembro.nombres = this.datosPersonales.controls.nombre.value;
    this.miembro.apellidos = this.datosPersonales.controls.apellidos.value;
    this.miembro.celular = this.datosPersonales.controls.celular.value;
    this.miembro.tipoDoc = this.datosPersonales.controls.tipoDoc.value;
    this.miembro.email = this.datosPersonales.controls.email.value;
    this.miembro.docID = this.datosPersonales.controls.idoc.value;
    this.miembro.edad = this.ministeriales.controls.edad.value;
    this.miembro.genero = this.ministeriales.controls.genero.value;
    this.miembro.ministerio = this.ministeriales.controls.lider.value;
    this.miembro.aceptotyc = this.terminos.controls.accept.value; 

    this.miembroService.createNewMember(this.miembro);

    this._router.navigate(['/registrado']);
  }


  getErrorMessageDOC() {
    if (this.datosPersonales.controls.idoc.hasError('required')) {
      return 'Debes ingresar tu numero de documento.';
    }
    if (this.datosPersonales.controls.idoc.hasError('maxlength')) {
      return 'El documento tiene mucho numeros, revisar el documento.';
    }
    if (this.datosPersonales.controls.idoc.hasError('pattern')) {
      return 'El documento no acepta letras.';
    }
    return this.datosPersonales.controls.idoc.hasError('minlength')
      ? 'Debes ingresar un documento valido.'
      : '';
  }

  getErrorMessageEmail() {
    if (this.datosPersonales.controls.email.hasError('required')) {
      return 'Debes ingresar tu correo electronico ex.pepito@correo.com.';
    }
    if (this.datosPersonales.controls.email.hasError('email')) {
      return 'Revise su correo, no es valido.';
    }
  }

  getErrorMessagePhone(){

    if (this.datosPersonales.controls.celular.hasError('required')) {
      return 'Debes ingresar tu numero celular.';
    }
  }

  getErrorMessageName(){
    if (this.datosPersonales.controls.nombre.hasError('required')) {
      return 'Debes ingresar tu nombre.';
    }
  }

  getErrorMessageApellidos(){
    if (this.datosPersonales.controls.apellidos.hasError('required')) {
      return 'Debes ingresar tus apellidos.';
    }
  }

  getErrorGenero(){
    if (this.ministeriales.controls.genero.hasError('required')) {
      return 'Debes seleccionar un genero.';
    }
  }

  getErrorEdad(){

    if (this.ministeriales.controls.edad.hasError('required')) {
      return 'Debes ingresar tu edad.';
    }
  }

  getErrorLider(){
    if(this.ministeriales.controls.lider.hasError('required')){
      return 'Debes ingresar tu lider de 12.'
    }
  }
}

