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
    private _fb: FormBuilder /* 
              private authService: AuthService, */,
    private activatedRoute: ActivatedRoute
  ) {
    this.user = this._fb.group({
      correo: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
      ]),
    })

  }

  ngOnInit() {
    this.notRegister = false;
  }

  onLoginRedirect(): void {
    this.router.navigate(['/administrador']);
  }

  onLogin(): void {
    /* 
    this.authService.loginEmailUser(this.email, this.password)
    .then((res)  => { // devuelve(then) una promesa((res))
      this.onLoginRedirect();
    }).catch(err => {console.log('err: ', err.message); 
      this.notRegister = true; 
    }); */
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
