import { Component, OnInit } from '@angular/core';
import { MiembrosInterface } from 'src/app/models/miembros.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  userID: any;
  
  constructor(private rutaActiva: ActivatedRoute,private _router: Router) {
    this.userID = this.rutaActiva.snapshot.params.id;

  }

  ngOnInit(): void {

    
  }
  consultarOtro(){
    this._router.navigate(['home']);
  }


}
