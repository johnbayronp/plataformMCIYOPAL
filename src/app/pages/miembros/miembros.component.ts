import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MiembrosInterface } from 'src/app/models/miembros.model';
import { MiembrosmciService } from 'src/app/services/miembrosmci.service';

@Component({
  selector: 'app-miembros',
  templateUrl: './miembros.component.html',
  styleUrls: ['./miembros.component.css']
})
export class MiembrosComponent implements OnInit {

  miembros: any;

  constructor(private Smember:MiembrosmciService,
    private router: Router) {
    this.allMembers();
  }

  ngOnInit(): void {
  }

  allMembers(){
    let res = this.Smember.allMembers();

    res.then(
      member => {
        this.miembros = member;
        console.log(this.miembros)
      }
    );
  }

  return(){
    this.router.navigate(['/administrador']);
  }

}
