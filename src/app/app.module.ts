import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { InicioComponent } from './paginas/inicio/inicio.component';
import { PokemonPipe } from './pipes/pokemon.pipe';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { BackofficeComponent } from './paginas/backoffice/backoffice.component';
import { LoginComponent } from './paginas/login/login.component';
import { MensajeComponent } from './componentes/mensaje/mensaje.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    PokemonPipe,
    NavbarComponent,
    BackofficeComponent,
    LoginComponent,
    MensajeComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
