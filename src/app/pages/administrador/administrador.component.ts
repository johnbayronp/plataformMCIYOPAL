import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { eventInterface } from 'src/app/models/event.model';
import { MiembrosInterface } from 'src/app/models/miembros.model';
import { EventosService } from 'src/app/services/eventos.service';


@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css'],
})
export class AdministradorComponent implements OnInit {
  createEvent: FormGroup;
  registeredEvent: FormGroup;
  temperatura: FormGroup;
  notEvent: boolean;
  eventsTabs: eventInterface[];
  asistentes: MiembrosInterface[] =[];
  dataSource:any;

  displayedColumns: string[] = [
    'cedula',
    'nombre',
    'apellidos',
    'ministerio',
    'correo',
    'q1',
    'q2',
    'q3',
    'Temperatura',
  ];

  constructor(private _fb: FormBuilder, private eService: EventosService) {
    (this.createEvent = this._fb.group({
      eventName: new FormControl('', [Validators.required]),
      eventDate: new FormControl('', [Validators.required]),
      eventAforo: new FormControl('', [Validators.required]),
      eventHora: new FormControl('', [Validators.required]),
    })),
      (this.registeredEvent = this._fb.group({
        nombreSearch: new FormControl('', [Validators.required]),
        dateSearch: new FormControl('', [Validators.required]),
      })),
      (this.temperatura = this._fb.group({
        temp: new FormControl('', [Validators.required])
      })) 
      ;


  }

  ngOnInit(): void {

    let data = this.eService.searchEventos();
    data.then(
      result => {
        if(!result){
          return this.notEvent = true;
        }
        this.notEvent = false;

        let array = result.map(res=> res["asistentes"]);

        this.dataSource = new MatTableDataSource(array);
        return this.eventsTabs = result;
      }
    ).catch(
      err => console.log(err)
    );

   
    
  }


  exportxls(){
    console.log('exportando excel')
    // exportar hoja de asistentes
  }

  createNewEvent() {
    let res = confirm('Desea crear el evento');
    if (res) {
      this.eService.createEvent(
        this.createEvent.value.eventName,
        this.createEvent.value.eventAforo,
        this.createEvent.value.eventDate,
        this.createEvent.value.eventHora
      );
      this.createEvent.reset();
    }
  }

  searchEventNow() {
   
    let data = this.eService.searchEventos();
    data.then(
      result => {
        if(!result){
          return this.notEvent = true;
        }
        this.notEvent = false;
        this.asistentes = result.map(res => res["asistentes"]);
        return this.eventsTabs = result;
      }
    ).catch(
      err => console.log(err)
    );

    console.log('data',this.dataSource.data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  update(asistente) {
    console.log(asistente.docID, this.temperatura.value.temp );
  }
}
