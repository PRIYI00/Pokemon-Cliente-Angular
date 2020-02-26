import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon';
import { PokemonService } from '../services/Pokemon.service';
import { HabilidadService } from '../services/Habilidad.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.sass']
})
export class InicioComponent implements OnInit {

  title: string;
  pokemons: Array<Pokemon>;
  pokemonsManipular: any;
  pokemonSeleccionado: Pokemon;
  busqueda: string;
  habilidad: any;
  habilidades: Array<any>;
  habilidadesChecks: Array<number>; // ids habilidades pulsados

  constructor(private servicioPokemon: PokemonService, private servicioHabilidad: HabilidadService) { 
    console.trace('InicioComponent Constructor');
    this.title = 'Pokemon Angular';
    this.busqueda = '';
    this.pokemons = [];
    this.habilidades = [];
    this.habilidadesChecks = [];
  } // Constructor

  ngOnInit() {
    console.trace('ngOnInit InicioComponent');
    this.listarPokemons();
    this.listarHabilidades();
  } // ngOnInit

  private listarPokemons(): void {
    console.trace('Metodo Listar Pokemons');
    // Llamar al Service para Optener Tareas.
    this.servicioPokemon.getAllPokemon().subscribe(
      datos => {
        console.trace('Estas en el Subscribe');
        this.pokemons = datos;
      },
      error => {
        console.warn('Ha Ocurrido algun Error');
      },
      () => {
        console.trace('Esto se hace Siempre');
      }
    );
  } // ListarPokemons

  private listarHabilidades(): void {
    console.debug('Metodo Listar Habilidades');
    this.servicioHabilidad.getAllHabilidades().subscribe(
      datos => {
        console.debug('Estas en el Subscribe');
        this.habilidades = datos;
      },
      error => {
        console.warn(error);
      },
      () => {
        console.debug('Esto se hace Siempre');
      }
    );
  } // Listar Habilidades

  checked() {
    return this.habilidades.filter(item => {return item.checked;});
  }

  filtrarPorHabilidades(idHabilidadSeleecionado: number) {
    console.debug('filtrarPorHabilidades ' + idHabilidadSeleecionado);
    this.habilidadesChecks.push(idHabilidadSeleecionado);
    console.debug(this.habilidadesChecks);
    console.debug(this.pokemons);
    this.pokemonsManipular = this.pokemons.slice(); // Crear Copia de Lista de Todos los Pokemons

    if (this.habilidadesChecks.length > 0) {
      this.pokemonsManipular.filter(el => {
        console.debug(el.habilidades.find(hab => this.habilidadesChecks.indexOf(hab) !== -1));
        return el.habilidades.find(hab => this.habilidadesChecks.indexOf(hab) !== -1);
      });
    }
  }

} // InicioComponent
