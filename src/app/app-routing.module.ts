import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { BackofficeComponent } from './paginas/backoffice/backoffice.component';
import { LoginComponent } from './paginas/login/login.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'backoffice', component: BackofficeComponent},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
