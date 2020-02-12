import { Habilidad } from './habilidad';

export class Pokemon {
    private _id_pokemon: number;
    private _pokemon: string;
    private _imagen: string;
    private _habilidades: Array<Habilidad>;
    
    constructor(){
        this._id_pokemon = 0;
        this._pokemon = '';
        this._habilidades = [];
    }
    
    public get id_pokemon(): number {
        return this._id_pokemon;
    }
    public set id_pokemon(value: number) {
        this._id_pokemon = value;
    }

    public get pokemon(): string {
        return this._pokemon;
    }
    public set pokemon(value: string) {
        this._pokemon = value;
    }

    public get imagen(): string {
        return this._imagen;
    }
    public set imagen(value: string) {
        this._imagen = value;
    }

    public get habilidades(): Array<Habilidad> {
        return this._habilidades;
    }
    public set habilidades(value: Array<Habilidad>) {
        this._habilidades = value;
    }
}
