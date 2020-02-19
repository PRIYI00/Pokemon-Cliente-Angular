import { IPokemonService } from './IPokemon.service';
import { Pokemon } from 'src/app/model/pokemon';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class PokemonService implements IPokemonService {
    constructor(private http: HttpClient) { 
        console.debug("PokemonService Constructor");
    }

    getAllPokemon(): Observable<Pokemon[]> {
        const url = `http://localhost:8080/pokemon-rest/api/pokemon`;
        console.debug("PokemonService getAllPokemon " + url);
        return this.http.get<Pokemon[]>(url);
    }    
    getPokemon(nombre: string): Observable<Pokemon[]> {
        const url = `http://localhost:8080/pokemon-rest/api/pokemon/${nombre}/`;
        console.debug("PokemonService getAllPokemonByNombre " + url);
        return this.http.get<Pokemon[]>(url);
    }
    getPokemonById(id_pokemon: number): Observable<Pokemon> {
        const url = `http://localhost:8080/pokemon-rest/api/pokemon/${id_pokemon}/`;
        console.debug("PokemonService getPokemonById " + url);
        return this.http.get<Pokemon>(url);
    }
    deletePokemon(id_pokemon: number): Observable<Pokemon> {
        const url = `http://localhost:8080/pokemon-rest/api/pokemon/${id_pokemon}/`;
        console.debug("PokemonService deletePokemon " + url);
        return this.http.delete<Pokemon>(url);
    }
    updatePokemon(id_pokemon: number, pokemon: Pokemon): Observable<Pokemon> {
        const url = `http://localhost:8080/pokemon-rest/api/pokemon/${id_pokemon}/`;
        console.debug("PokemonService updatePokemon " + url);
        return this.http.post<Pokemon>(url, pokemon);
    }
    createPokemon(pokemon: Pokemon): Observable<Pokemon> {
        const url = `http://localhost:8080/pokemon-rest/api/pokemon`;
        console.debug("PokemonService createPokemon " + url);
        return this.http.post<Pokemon>(url, pokemon);
    }
}