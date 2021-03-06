import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/model/pokemon';
import { PokemonService } from '../services/Pokemon.service';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Habilidad } from 'src/app/model/habilidad';
import { HabilidadService } from '../services/Habilidad.service';

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.sass']
})
export class BackofficeComponent implements OnInit {

  title: string;
  pokemons: Array<Pokemon>;
  habilidades: Array<any>;
  pokemonSeleccionado: Pokemon;
  pokemonEliminado: Pokemon;
  pokemonCreado: Pokemon;
  pokemonModificado: Pokemon;
  busqueda: string;
  formularioPokemon: FormGroup;
  formularioHabilidades: FormArray;

  constructor(private builder: FormBuilder, 
              private servicioPokemon: PokemonService,
              private servicioHabilidad: HabilidadService) { 
    console.debug('BackOfficeComponent Constructor');
    this.title = 'Administración Pokemon';
    this.busqueda = '';
    this.pokemons = [];
    this.habilidades = [];

    // Construir Formulario.
    this.formularioPokemon = this.builder.group({
      // Definir Valores del Formulario.
      id: new FormControl(0),
      nombre: ['', Validators.compose(
        [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
      )],
      imagen: ['', Validators.compose(
        [Validators.required, Validators.minLength(2), Validators.maxLength(250)]
      )],
      fHabilidades: this.builder.array([], Validators.compose(
        [Validators.required, Validators.minLength(1)]
      ))
    }); // Formulario Pokemon Constructor
    this.formularioHabilidades = this.formularioPokemon.get('fHabilidades') as FormArray;
  } // Constructor

  ngOnInit() {
    console.debug('BackOfficeComponent ngOnInit');
    this.listarPokemons();
    this.listarHabilidades();
  } // ngOnInit

  private listarPokemons(): void {
    console.debug('Metodo Listar Pokemons');
    // Llamar al Service para Optener Pokemons.
    this.servicioPokemon.getAllPokemon().subscribe(
      datos => {
        console.debug('Estas en el Subscribe');
        this.pokemons = datos;
      },
      error => {
        console.warn(error);
      },
      () => {
        console.debug('Esto se hace Siempre');
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
      console.debug('Cancelado Eliminacion');
    }
  } // Eliminar Pokemon

  modificarPokemon(pokemon: Pokemon) {
    console.debug('Vamos a Modificar el Pokemon %o ', pokemon);
    this.formularioPokemon.get('id').setValue(pokemon.id);
    this.formularioPokemon.get('nombre').setValue(pokemon.nombre);
    this.formularioPokemon.get('imagen').setValue(pokemon.imagen);
    this.resetFormArray(this.formularioHabilidades);

    if(pokemon.habilidades.length > 0) {
      pokemon.habilidades.forEach(poke => {
        const habilidad = this.crearFormGroupHabilidades();
        habilidad.get('id').setValue(poke.id);
        habilidad.get('habilidad').setValue(poke.habilidad);

        this.formularioHabilidades.push(habilidad);

        this.habilidades.forEach(habi => {
          if (poke.id === habi.id) {
            habi.checked = true;
          }
        });
      });
    }
  } // Modificar Pokemon

  enviar(values: any) {
    console.debug('BackOfficeComponent Enviar Formulario Pokemon %o ', values);
    console.debug(values.id);
    
    let pokemon = new Pokemon();
    pokemon.id = values.id;
    pokemon.nombre = values.nombre;
    pokemon.imagen = values.imagen;
    pokemon.habilidades = values.fHabilidades;

    if (pokemon.id === 0) {
      this.servicioPokemon.createPokemon(pokemon).subscribe(
        datos => {
          console.debug('Estas en el Subscribe');
          this.pokemonCreado = datos;
          this.ponerPorDefecto();
          this.listarPokemons();
        },
        error => {
          console.warn(error);
        },
        () => {
          console.debug('Esto se hace Siempre');
        }
      );
    } else {
      this.servicioPokemon.updatePokemon(pokemon.id, pokemon).subscribe(
        datos => {
          console.debug('Estas en el Subscribe');
          this.pokemonModificado = datos;
          this.ponerPorDefecto();
          this.listarPokemons();
        },
        error => {
          console.warn(error);
        },
        () => {
          console.debug('Esto se hace Siempre');
        }
      );
    }

    this.restablecerValores();
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
    this.formularioPokemon.get('imagen').setValue('');
  } // Poner Por defecto

  private crearFormGroupHabilidades(): FormGroup {
    return this.builder.group({
              id: new FormControl(0),
              habilidad: ['', Validators.compose(
                [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
              )]
    });
  } // CrearFormGroupHabilidades

  checkCambiado(habilidadSeleccionada: any) {
    habilidadSeleccionada.checked = !habilidadSeleccionada.checked;
    console.debug('CheckCambiado %o', habilidadSeleccionada);

    const habilidad = this.crearFormGroupHabilidades();
    habilidad.get('id').setValue(habilidadSeleccionada.id);
    habilidad.get('habilidad').setValue(habilidadSeleccionada.habilidad);

    if(habilidadSeleccionada.checked === false) {
      this.formularioHabilidades.removeAt(this.formularioHabilidades.value.findIndex(el => el.id === habilidadSeleccionada.id));
    } else {   
      this.formularioHabilidades.push(habilidad);
    }
  } // CheckCambiado

  restablecerValores() {
    console.log('Restablecemos los Valores del Formulario.');

    this.habilidades.forEach(habi => {habi.checked = false});

    this.formularioPokemon.get('id').setValue(0);
    this.formularioPokemon.get('nombre').setValue('');
    this.formularioPokemon.get('imagen').setValue('');
    this.resetFormArray(this.formularioHabilidades);
  } // RestablecerValores

  resetFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  } // ResetFormArray
} // BackOfficeComponent
