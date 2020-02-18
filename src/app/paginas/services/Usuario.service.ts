import { IUsuarioService } from './IUsuario.service';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService implements IUsuarioService {
    private storage: any;
    private isLogged: boolean;
    private usuario: Usuario;

    constructor() { 
        console.debug('UsuariosService Constructor');
        this.storage = window.sessionStorage;
        this.isLogged = false;
        this.usuario = undefined;
    } // Constructor

    estaLogeado(): boolean {
        console.debug('UsuarioService estaLogeado');
        const estaLog = this.storage.getItem('isLogged');
        if (estaLog) {
            return true;
        } else {
            return false;
        }
    }

    login(nombre: string, password: string): Usuario {
        console.debug('UsuariosService Login nombre %s password %s', nombre, password);
        const NOMBRE = 'admin';
        const PASS = 'admin123';

        let usuarioBuscar: Usuario;

        if (NOMBRE === nombre && PASS === password) {
            console.debug('Usuario Encontrado.');
            // Crear Usuario.
            usuarioBuscar = new Usuario();
            usuarioBuscar.nombre = nombre;
            usuarioBuscar.password = password;
            usuarioBuscar.id = 99;
            // Marcar que esta Logeado.
            this.storage.setItem('isLogged', true);
        } else {
            console.debug('Usuario no Encontrado.');
            this.storage.setItem('isLogged', false);
        }

        return usuarioBuscar;
    } // Login

    cerrarSesion() {
        console.debug('Metodo Cerrar Sesion UsuarioService');
        this.storage.removeItem('isLogged');
    } // Cerrar Sesion
}