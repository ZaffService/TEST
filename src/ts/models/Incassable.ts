import { Materiel } from './Materiel';

export class Incassable extends Materiel {
  constructor(libelle: string, poids: number) {
      super(libelle, poids);
  }

  public info(): string {
      return `Matériel Incassable: ${this.libelle}, Poids: ${this.poids} kg`;
  }
}
