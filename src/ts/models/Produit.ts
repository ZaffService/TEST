export abstract class Produit {
  protected libelle: string;
  protected poids: number; // in kg

  constructor(libelle: string, poids: number) {
      if (poids <= 0) {
          throw new Error("Le poids du produit doit être supérieur à zéro.");
      }
      this.libelle = libelle;
      this.poids = poids;
  }

  // Accessors (Getters)
  public getLibelle(): string {
      return this.libelle;
  }

  public getPoids(): number {
      return this.poids;
  }

  // Mutators (Setters)
  public setLibelle(libelle: string): void {
      this.libelle = libelle;
  }

  public setPoids(poids: number): void {
      if (poids <= 0) {
          throw new Error("Le poids du produit doit être supérieur à zéro.");
      }
      this.poids = poids;
  }

  public abstract info(): string;
}
