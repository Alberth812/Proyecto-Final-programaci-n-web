// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core'; // <--- THIS IS IMPORTANT to import
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // <--- YOU NEED TO IMPORT THIS

import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';
import { CompraComponent } from './compra/compra.component';
import { AdminPanelComponent } from './admin/admin.component';
import { PerfilComponent } from './usuario/perfil.component';


// Define tus rutas aquí
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'panel', component: PanelComponent },
  { path: 'compra', component: CompraComponent },
  { path: 'admin', component: AdminPanelComponent },
  { path: 'perfil', component: PerfilComponent },

];

export const appConfig: ApplicationConfig = { // <--- Apply ApplicationConfig type
  providers: [
    provideRouter(routes),
    provideHttpClient() // <--- THIS IS THE LINE YOU WERE MISSING!
  ]
};