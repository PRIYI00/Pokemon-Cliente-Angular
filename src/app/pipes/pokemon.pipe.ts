import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../model/pokemon';

@Pipe({
  name: 'pokemonFiltro'
})
export class PokemonPipe implements PipeTransform {

  transform(pokemons: any, busqueda: any): any {

    console.debug('PokemonPipe Pokemons %o', pokemons);
    console.debug('PokemonPipe Busqueda %s', busqueda);

    let resultado = pokemons;

    // Filtrar por Nombre del Pokemon.
    if (busqueda && '' !== busqueda) {
      busqueda = busqueda.toUpperCase();
      resultado = resultado.filter((el) => {
        console.debug(el);
        const nombre = el.nombre.toUpperCase();
        return nombre.includes(busqueda);
      });
    }
    return resultado;
  } // Transform
} // PokemonPipe
