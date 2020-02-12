import { Observable } from "rxjs";
import { Pokemon } from 'src/app/model/pokemon';

export interface IPokemonService {

    /**
     * Recuperamos los datos en Json de Todos los Pokemons.
     * @return Retorna un Array Observable de Pokemon.
     */
    getAllPokemon(): Observable<Array<Pokemon>>;

    /**
     * Recuperamos los datos en Json de los Pokemons que coincidan con el Nombre.
     * @param nombre:string - Nombre del Pokemon a buscar.
     * @return Retorna un Array Observable de Pokemon con todas las posibilidades 
     * que coincidan con el Nombre del Pokemon introducido.
     */
    getPokemon(nombre:string): Observable<Array<Pokemon>>;

    /**
     * Recuperamos los datos en Json de un Pokemon dependiendo del ID introducido.
     * @param id_pokemon: number - es el id del pokemon que vamos a recuperar.
     * @return Retorna un Pokemon Observable dependiendo el ID que se le pase.
     */
    getPokemonById(id_pokemon: number): Observable<Pokemon>;

    /**
     * Borrar un Pokemon de la Base de Datos dependiendo del ID que se le pase.
     * @param id_pokemon: number - es el id del pokemon que vamos a Eliminar.
     * @return Retorna un Pokemon Observable dependiendo el ID que se le pase.
     */
    deletePokemon(id_pokemon: number): Observable<Pokemon>;

    /**
     * Modificar un Pokemon de la Base de Datos dependiendo del ID y el pojo que se le pase.
     * @param id_pokemon: number - ID del Pokemon ha modificar.
     * @param pokemon: Pokemon - le pasamos los parametros del Pokemon que quermos que 
     * tenga el Pokemon Modificado.
     * @return Retorna un Pokemon Observable Modificado.
     */
    updatePokemon(id_pokemon: number, pokemon: Pokemon): Observable<Pokemon>;

    /**
     * Creamos un Pokemon.
     * @param pokemon: Pokemon - Pokemon a crear.
     * @return Nos devuelve el Pokemon Creado.
     */
    createPokemon(pokemon: Pokemon): Observable<Pokemon>;
}