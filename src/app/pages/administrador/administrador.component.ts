import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EventosService } from 'src/app/services/eventos.service';
@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css'],
})

export class AdministradorComponent implements OnInit {
  createEvent: FormGroup;
  registeredEvent: FormGroup;

  constructor(private _fb: FormBuilder, private eService: EventosService) {
    (this.createEvent = this._fb.group({
      eventName: new FormControl('', [Validators.required]),
      eventDate: new FormControl('', [Validators.required]),
      eventAforo: new FormControl('', [Validators.required]),
      eventHora: new FormControl('', [Validators.required]),
    })),
      (this.registeredEvent = this._fb.group({
        nombreSearch: new FormControl('', [Validators.required]),
        dateSearch: new FormControl('', [Validators.required])
      }));
  }

  ngOnInit(): void {}

  createNewEvent() {
    
    let res = confirm('Desea crear el evento');
    if(res){
      this.eService.createEvent(
        this.createEvent.value.eventName,
        this.createEvent.value.eventAforo,
        this.createEvent.value.eventDate,
        this.createEvent.value.eventHora
      );
      this.createEvent.reset();
    }

  }

  searchEventNow(){
    var evento = this.eService.searchAsistentes('zbBWnnyJQESO5Hc8FGay');

    evento.then(
      (res) => console.log(res)
    ).catch(
      error => console.log('error')
    );

  }
}
