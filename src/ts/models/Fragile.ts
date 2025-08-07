import { Materiel } from './Materiel';

export class Fragile extends Materiel {
  constructor(libelle: string, poids: number) {
      super(libelle, poids);
  }

  public info(): string {
      return `Matériel Fragile: ${this.libelle}, Poids: ${this.poids} kg`;
  }
}
