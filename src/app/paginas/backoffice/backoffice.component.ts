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
  pokemonSeleccionado: Pokemon;
  busqueda: string;
  formularioPokemon: FormGroup;

  constructor(private builder: FormBuilder, 
              private router: Router, 
              private servicioPokemon: PokemonService) { 
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

  modificarPokemon(pokemon: Pokemon) {
    console.debug('Vamos a Modificar el Pokemon %o ', pokemon);
    this.formularioPokemon.get('nombre').setValue(pokemon.nombre);
  } // Modificar Pokemon

  enviar(values: any) {
    console.debug('BackOfficeComponent Enviar Formulario Pokemon %o ', values);
  } // Enviar

} // BackOfficeComponent
