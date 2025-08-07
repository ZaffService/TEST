import { Produit } from './Produit';

export class Alimentaire extends Produit {
  constructor(libelle: string, poids: number) {
      super(libelle, poids);
  }

  public info(): string {
      return `Produit Alimentaire: ${this.libelle}, Poids: ${this.poids} kg`;
  }
}
