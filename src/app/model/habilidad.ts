export class Habilidad {
    private _id_habilidad: number;
    private _habilidad: string;

    constructor(nombre:string){
        this._id_habilidad = 0;
        this._habilidad = nombre;
    }

    public get id_habilidad(): number {
        return this._id_habilidad;
    }
    public set id_habilidad(value: number) {
        this._id_habilidad = value;
    }

    public get habilidad(): string {
        return this._habilidad;
    }
    public set habilidad(value: string) {
        this._habilidad = value;
    }
}
