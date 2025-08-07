import { Produit } from './Produit';

export abstract class Materiel extends Produit {
  // No new specific attributes for Materiel itself, but serves as a base for Fragile/Incassable
  constructor(libelle: string, poids: number) {
      super(libelle, poids);
  }

  public abstract info(): string;
}
