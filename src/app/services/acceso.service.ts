import { Injectable } from '@angular/core';
/*Servicios para proteger las rutas */
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AccesoService {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.authService.isAuth()
    .then(res => { 
      if(res){
        return true;
      }
      return false; 
    })
    .catch(err => console.log(err));
  }
}
