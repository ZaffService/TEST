import { Produit } from './Produit';

export class Chimique extends Produit {
  private degreToxicite: string; // Ex: Faible, Moyen, Élevé

  constructor(libelle: string, poids: number, degreToxicite: string) {
      super(libelle, poids);
      this.degreToxicite = degreToxicite;
  }

  // Accessors
  public getDegreToxicite(): string {
      return this.degreToxicite;
  }

  // Mutators
  public setDegreToxicite(degreToxicite: string): void {
      this.degreToxicite = degreToxicite;
  }

  public info(): string {
      return `Produit Chimique: ${this.libelle}, Poids: ${this.poids} kg, Toxicité: ${this.degreToxicite}`;
  }
}
