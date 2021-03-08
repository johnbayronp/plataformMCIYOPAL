import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';


// Cargar modulos exportados desde la app.routing.ts
import { appRoutingProviders , routing } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { MessagePolicyComponent } from './components/component/message-policy/message-policy.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidationFormComponent } from './components/validation-form/validation-form.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { EndregisterComponent } from './pages/endregister/endregister.component';
import { MessageCovidComponent } from './components/component/message-covid/message-covid.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ValidationFormComponent,
    RegisterComponent,
    MessagePolicyComponent,
    AdministradorComponent,
    EndregisterComponent,
    MessageCovidComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatStepperModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    NgbPaginationModule,
    MatRadioModule,
    MatTableModule,
    NgbAlertModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    routing
    
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
