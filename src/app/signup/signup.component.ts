import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../app.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute, private _router: Router) { }
  ngOnInit(): void {
  }
  
  pageLogin(){
    this._router.navigate(['/login']);
  }

}
