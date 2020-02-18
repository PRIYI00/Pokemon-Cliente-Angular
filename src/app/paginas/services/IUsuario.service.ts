import { Usuario } from 'src/app/model/usuario';

export interface IUsuarioService {
    estaLogeado(): boolean;

    /**
     * Comprueba que existe el Usuario.
     * @param nombre Nombre del Usuario.
     * @param password Contraseña del Usuario.
     * @return Usuario con Datos si existe, undefined si no existe.
     */
    login(nombre: string, password: string): Usuario;

    cerrarSesion(idUsuario: number);
}