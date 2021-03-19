import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core'; /* 
import { AuthService } from '../../servicios/auth.service'; */
import { AngularFireAuth } from '@angular/fire/auth'; /* 
import { auth } from 'firebase/app'; */
import { Router, ActivatedRoute, Params } from '@angular/router';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AccesoService } from 'src/app/services/acceso.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;
  public notRegister: boolean;
  user: FormGroup;
  hide = true;
  
  constructor(
    public afAuth: AngularFireAuth,
    private router: Router,
    private acceso: AccesoService,
    private _fb: FormBuilder ,
              private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.user = this._fb.group({
      correo: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
      ]),
    })


    this.islogged();
  }

  ngOnInit() {
    this.notRegister = false;
  }

  islogged(){
    this.acceso.canActivate().then(() => {
      console.log('logeado redireccionar')
      this.router.navigate(['/administrador']);
    })
  }

  onLoginRedirect(): void {
    this.router.navigate(['/administrador']);
  }

  onLogin(): void {

    this.authService.loginEmailUser(this.user.controls.correo.value,this.user.controls.password.value)
    .then((res)  => { // devuelve(then) una promesa((res))
      this.onLoginRedirect();
    }).catch(err => {console.log('err: ', err.message); 
      this.notRegister = true; 
    }); 
  }


  getErrorMessageEmail() {
    if (this.user.controls.email.hasError('required')) {
      return 'Debes ingresar tu correo electronico ex.pepito@correo.com.';
    }
    if (this.user.controls.email.hasError('email')) {
      return 'Revise su correo, no es valido.';
    }
  }

}
