import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';
import { CompraComponent } from './compra/compra.component'; // ✅ Agregado

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'panel', component: PanelComponent },
  { path: 'compra', component: CompraComponent } // ✅ Nueva ruta activa
  
];
