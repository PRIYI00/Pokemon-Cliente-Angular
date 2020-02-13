import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../model/pokemon';

@Pipe({
  name: 'pokemonFiltro'
})
export class PokemonPipe implements PipeTransform {

  transform(pokemons: Array<Pokemon>, busqueda: string): any {

    console.debug('PokemonPipe Pokemons %o', pokemons);
    console.debug('PokemonsPipe Busqueda %s', busqueda);

    let resultado = pokemons;

    // Filtrar por Nombre del Pokemon.
    if (busqueda && '' !== busqueda) {
      resultado = resultado.filter((el) => {
        console.debug(el);
        return el.nombre.includes(busqueda);
      });
    }
    return resultado;
  } // Transform
} // PokemonPipe
