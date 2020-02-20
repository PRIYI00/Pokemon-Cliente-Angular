import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IHabilidadService } from './IHabilidad.service';
import { Habilidad } from 'src/app/model/habilidad';

@Injectable({
    providedIn: 'root'
})
export class HabilidadService implements IHabilidadService {
    constructor(private http: HttpClient) { 
        console.debug("HabilidadService Constructor");
    } // Constructor HabilidadService

    getAllHabilidades(): Observable<Habilidad[]> {
        const url = `http://localhost:8080/pokemon-rest/api/habilidad`;
        console.debug("HabilidadService getAllHabilidades " + url);
        return this.http.get<Habilidad[]>(url);
    }    
    getHabilidadById(id_habilidad: number): Observable<Habilidad> {
        const url = `http://localhost:8080/pokemon-rest/api/habilidad/${id_habilidad}`;
        console.debug("HabilidadService getHabilidadById " + url);
        return this.http.get<Habilidad>(url);
    }
    deleteHabilidad(id_habilidad: number): Observable<Habilidad> {
        const url = `http://localhost:8080/pokemon-rest/api/habilidad/${id_habilidad}`;
        console.debug("HabilidadService deleteHabilidad " + url);
        return this.http.delete<Habilidad>(url);
    }
    updateHabilidad(id_habilidad: number, habilidad: Habilidad): Observable<Habilidad> {
        const url = `http://localhost:8080/pokemon-rest/api/habilidad/${id_habilidad}`;
        console.debug("HabilidadService updateHabilidad " + url);
        return this.http.put<Habilidad>(url, habilidad);
    }
    createHabilidad(habilidad: Habilidad): Observable<Habilidad> {
        const url = `http://localhost:8080/pokemon-rest/api/habilidad`;
        console.debug("HabilidadService createHabilidad " + url);
        return this.http.post<Habilidad>(url, habilidad);
    }
} // HabilidadService