import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/paginas/services/Usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, public usuarioService: UsuarioService) { 
    console.debug('NavbarComponent Constructor');
  } // Constructor

  ngOnInit() {
    console.debug('NavbarComponent ngOnInit');
  } // ngOnInit

  salir() {
    console.trace('NavbarComponent Salir (Cerrar Sesión)');
    const mensaje = '¿Esta seguro que quiere cerrar la sesión?';
    if (confirm(mensaje)) {
      this.usuarioService.cerrarSesion();
      this.router.navigate(['/']); // ir a Inicio
    } else {
      console.trace('Sigue a lo Tuyo');
    }
  } // Salir


} // NavbarComponent
