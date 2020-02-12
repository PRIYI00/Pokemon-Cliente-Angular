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
        console.trace("PokemonService Constructor");
    }

    getAllPokemon(): Observable<Pokemon[]> {
        const url = `http://localhost:8080/pokemon-rest/api/pokemon`;
        console.trace("PokemonService getAllPokemon " + url);
        return this.http.get<Pokemon[]>(url);
    }    
    getPokemon(nombre: string): Observable<Pokemon[]> {
        throw new Error("Method not implemented.");
    }
    getPokemonById(id_pokemon: number): Observable<Pokemon> {
        const url = `http://localhost:8080/pokemon-rest/api/pokemon/${id_pokemon}/`;
        console.trace("PokemonService getPokemonById " + url);
        return this.http.get<Pokemon>(url);
    }
    deletePokemon(id_pokemon: number): Observable<Pokemon> {
        throw new Error("Method not implemented.");
    }
    updatePokemon(id_pokemon: number, pokemon: Pokemon): Observable<Pokemon> {
        throw new Error("Method not implemented.");
    }
    createPokemon(pokemon: Pokemon): Observable<Pokemon> {
        throw new Error("Method not implemented.");
    }
}