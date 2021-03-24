// Importamos los modulos del router en angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importar componentes a los cuales les quiero hacer una pagina exclusiva

import { SignupComponent } from './signup/signup.component';
import { AdministradorComponent } from './pages/administrador/administrador.component';
import { EndregisterComponent } from './pages/endregister/endregister.component';
import { LoginComponent } from './pages/login/login.component';
import { AccesoService } from './services/acceso.service';
import { MiembrosComponent } from './pages/miembros/miembros.component';
import { EventosComponent } from './pages/eventos/eventos.component';

// Array de Rutas
const appRoutes: Routes = [
    { path: '', component: SignupComponent },
    { path: 'home', component: SignupComponent },
    { path: 'administrador', component: AdministradorComponent,canActivate: [AccesoService]},
    { path: 'registrado', component: EndregisterComponent},
    { path: 'login', component: LoginComponent},
    { path: 'registrados/miembros', component: MiembrosComponent},
    { path: 'eventos/:id', component: EventosComponent},
    { path: '**', component: SignupComponent }
];

// Exportar el  modulo de rutas
export const appRoutingProviders: any[] = []; // Servicio
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes); 
