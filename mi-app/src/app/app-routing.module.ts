import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PanelComponent } from './panel/panel.component';
import { CompraComponent } from './compra/compra.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'panel', component: PanelComponent },
  { path: 'compra', component: CompraComponent },
  { path: 'eventos', component: PanelComponent },  // <-- Agrega esta línea
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
