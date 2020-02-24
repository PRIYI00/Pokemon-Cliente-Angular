import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/Usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor(private builder: FormBuilder, 
              private router: Router, 
              private usuarioService: UsuarioService) { 
    console.trace('LoginComponent Constructor');

    // Construir Formulario
    this.formulario = this.builder.group({
      // Definir los Valores del Formulario.
      nombre: ['', Validators.compose(
        [Validators.required, Validators.minLength(2), Validators.maxLength(100)]
      )],
      password: ['', Validators.compose(
        [Validators.required, Validators.minLength(6), Validators.maxLength(8)]
      )]
    });
  } // Constructor

  ngOnInit() {
    console.trace('LoginComponent ngOnInit');
  } // NgOnInit

  enviar(values: any) {
    console.trace('LoginComponent Enviar Formulario %o ', values);

    const nombre = values.nombre;
    const password = values.password;
    const uLogeado = this.usuarioService.login(nombre, password);

    if (uLogeado) {
      console.trace('Usuario logeado con exito %o', uLogeado);
      this.router.navigate(['backoffice']);
    } else {
      console.warn('Usuario NO logeado');
      // TODO cambiar alert
      alert('Por favor prueba de nuevo a logearte');
    }
  } // Enviar
}
