import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-endregister',
  templateUrl: './endregister.component.html',
  styleUrls: ['./endregister.component.css']
})
export class EndregisterComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this._router.navigate(['/home']);
    },2000);
  }

  
}
