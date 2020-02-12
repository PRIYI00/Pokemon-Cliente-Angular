import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon';
import { PokemonService } from '../services/Pokemon.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.sass']
})
export class InicioComponent implements OnInit {

  title: string;
  pokemons: Array<Pokemon>;

  constructor(private servicioPokemon: PokemonService) { 
    console.trace('InicioComponent Constructor');
    this.title = 'Pokemon Angular';
    this.pokemons = [];
  } // Constructor

  ngOnInit() {
    console.trace('ngOnInit InicioComponent');
    this.listarPokemons();
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

} // InicioComponent
