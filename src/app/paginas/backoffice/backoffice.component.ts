import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon';
import { PokemonService } from '../services/Pokemon.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.sass']
})
export class BackofficeComponent implements OnInit {

  title: string;
  pokemons: Array<Pokemon>;
  habilidades: Array<string>;
  pokemonSeleccionado: Pokemon;
  pokemonEliminado: Pokemon;
  pokemonCreado: Pokemon;
  pokemonModificado: Pokemon;
  busqueda: string;
  formularioPokemon: FormGroup;

  constructor(private builder: FormBuilder, private servicioPokemon: PokemonService) { 
    console.debug('BackOfficeComponent Constructor');
    this.title = 'Administración Pokemon';
    this.busqueda = '';
    this.pokemons = [];

    // Construir Formulario.
    this.formularioPokemon = this.builder.group({
      // Definir Valores del Formulario.
      id: new FormControl(0),
      nombre: ['', Validators.compose(
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
      )]
    });
  } // Constructor

  ngOnInit() {
    console.debug('BackOfficeComponent ngOnInit');
    this.listarPokemons();

    // Habilidades sin repeticion
    this.habilidades = this.pokemons.reduce((p, c, i, a) => {
      return p.concat(c.habilidades);
    }, []).filter((el, index, array) => {
      console.debug(el, index, array);
      return array.indexOf(el) === index;
    });
  } // ngOnInit

  private listarPokemons(): void {
    console.debug('Metodo Listar Pokemons');
    // Llamar al Service para Optener Tareas.
    this.servicioPokemon.getAllPokemon().subscribe(
      datos => {
        console.debug('Estas en el Subscribe');
        this.pokemons = datos;
      },
      error => {
        console.warn('Ha Ocurrido algun Error');
      },
      () => {
        console.debug('Esto se hace Siempre');
      }
    );
  } // ListarPokemons

  eliminarPokemon(pokemon: Pokemon) {
    console.debug('Vamos a Eliminar este Pokemon %o ', pokemon);
    if (confirm('¿Estas Seguro?')) {
      console.debug('Confirmado Eliminacion');
      this.servicioPokemon.deletePokemon(pokemon.id).subscribe(() => {
          console.debug('Eliminar en BackOfficeComponent %o ', pokemon);
          this.pokemonEliminado = pokemon;
          this.ponerPorDefecto();
          this.listarPokemons();
        }
      );
    } else {
      console.trace('Cancelado Eliminacion');
    }
  } // Eliminar Pokemon

  modificarPokemon(pokemon: Pokemon) {
    console.debug('Vamos a Modificar el Pokemon %o ', pokemon);
    this.formularioPokemon.get('id').setValue(pokemon.id);
    this.formularioPokemon.get('nombre').setValue(pokemon.nombre);
  } // Modificar Pokemon

  enviar(values: any) {
    console.debug('BackOfficeComponent Enviar Formulario Pokemon %o ', values);
    console.debug(values.id);
    if (values.id === 0) {
      let pokemon = new Pokemon();
      pokemon.nombre = values.nombre;
      this.servicioPokemon.createPokemon(pokemon).subscribe(
        datos => {
          console.debug('Estas en el Subscribe');
          this.pokemonCreado = datos;
          this.ponerPorDefecto();
          this.listarPokemons();
        },
        error => {
          console.warn('Ha Ocurrido algun Error');
        },
        () => {
          console.debug('Esto se hace Siempre');
        }
      );
    } else {
      this.servicioPokemon.updatePokemon(values.id, values).subscribe(
        datos => {
          console.debug('Estas en el Subscribe');
          this.pokemonModificado = datos;
          this.ponerPorDefecto();
          this.listarPokemons();
        },
        error => {
          console.warn('Ha Ocurrido algun Error');
        },
        () => {
          console.debug('Esto se hace Siempre');
        }
      );
    }
  } // Enviar Formulario

  private ponerPorDefecto() {
    if(this.pokemonModificado) {
      this.pokemonEliminado = undefined;
      this.pokemonCreado = undefined;
    }
    if(this.pokemonCreado) {
      this.pokemonEliminado = undefined;
      this.pokemonModificado = undefined;
    }
    if(this.pokemonEliminado) {
      this.pokemonCreado = undefined;
      this.pokemonModificado = undefined;
    }
    this.pokemonSeleccionado = undefined;
    this.formularioPokemon.get('id').setValue(0);
    this.formularioPokemon.get('nombre').setValue('');
  } // Poner Por defecto

} // BackOfficeComponent
