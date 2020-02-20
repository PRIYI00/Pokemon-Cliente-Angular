import { Habilidad } from 'src/app/model/habilidad';
import { Observable } from 'rxjs';

export interface IHabilidadService {
    /**
     * Recuperamos los datos en Json de Todas las Habilidades.
     * @return Retorna un Array Observable de Habilidad.
     */
    getAllHabilidades(): Observable<Array<Habilidad>>;

    /**
     * Recuperamos los datos en Json de una Habilidad dependiendo del ID introducido.
     * @param id_habilidad: number - es el id de la habilidad que vamos a recuperar.
     * @return Retorna una Habilidad Observable dependiendo el ID que se le pase.
     */
    getHabilidadById(id_habilidad: number): Observable<Habilidad>;

    /**
     * Borrar una Habilidad de la Base de Datos dependiendo del ID que se le pase.
     * @param id_habilidad: number - es el id de la Habilidad que vamos a Eliminar.
     * @return Retorna una Habilidad Observable dependiendo el ID que se le pase.
     */
    deleteHabilidad(id_habilidad: number): Observable<Habilidad>;

    /**
     * Modificar una Habilidad de la Base de Datos dependiendo del ID y el pojo que se le pase.
     * @param id_habilidad: number - ID de la Habilidad ha modificar.
     * @param habilidad: Habilidad - le pasamos los parametros de la Habilidad que quermos que 
     * tenga la Habilidad Modificada.
     * @return Retorna una Habilidad Observable Modificado.
     */
    updateHabilidad(id_habilidad: number, habilidad: Habilidad): Observable<Habilidad>;

    /**
     * Creamos una Habilidad.
     * @param habilidad: Habilidad - Habilidad a crear.
     * @return Nos devuelve la Habilidad Creada.
     */
    createHabilidad(habilidad: Habilidad): Observable<Habilidad>;
}