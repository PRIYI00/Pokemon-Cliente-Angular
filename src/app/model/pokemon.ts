import { Habilidad } from './habilidad';

export class Pokemon {
    id: number;
    nombre: string;
    imagen: string;
    habilidades: Array<Habilidad>;
    
    constructor(){
        this.id = 0;
        this.nombre = '';
        this.imagen = '';
        this.habilidades = [];
    }
}
