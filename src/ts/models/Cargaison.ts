import { Produit } from './Produit';
import { Chimique } from './Chimique';
import { Fragile } from './Fragile';

export type EtatAvancement = "en-attente" | "en-cours" | "arrive" | "recupere" | "perdu" | "archive";
export type EtatGlobal = "ouvert" | "ferme";
export type TypeCargaison = "maritime" | "aerienne" | "routiere";

export abstract class Cargaison {
  protected numero: string;
  protected poidsMax: number;
  protected produits: Produit[] = [];
  protected prixTotal: number = 0;
  protected lieuDepart: string; // Coordonnées géographiques ou ville
  protected lieuArrivee: string; // Coordonnées géographiques ou ville
  protected distanceKm: number;
  protected type: TypeCargaison;
  protected etatAvancement: EtatAvancement;
  protected etatGlobale: EtatGlobal;
  protected readonly MAX_PRODUCTS: number = 10;
  protected readonly MIN_PACKAGE_PRICE: number = 10000; // 10.000 F

  constructor(
      numero: string,
      poidsMax: number,
      lieuDepart: string,
      lieuArrivee: string,
      distanceKm: number,
      type: TypeCargaison,
      etatAvancement: EtatAvancement = "en-attente",
      etatGlobale: EtatGlobal = "ouvert"
  ) {
      this.numero = numero;
      this.poidsMax = poidsMax;
      this.lieuDepart = lieuDepart;
      this.lieuArrivee = lieuArrivee;
      this.distanceKm = distanceKm;
      this.type = type;
      this.etatAvancement = etatAvancement;
      this.etatGlobale = etatGlobale;
  }

  // Accessors (Getters)
  public getNumero(): string { return this.numero; }
  public getPoidsMax(): number { return this.poidsMax; }
  public getProduits(): Produit[] { return this.produits; }
  public getPrixTotal(): number { return this.prixTotal; }
  public getLieuDepart(): string { return this.lieuDepart; }
  public getLieuArrivee(): string { return this.lieuArrivee; }
  public getDistanceKm(): number { return this.distanceKm; }
  public getType(): TypeCargaison { return this.type; }
  public getEtatAvancement(): EtatAvancement { return this.etatAvancement; }
  public getEtatGlobale(): EtatGlobal { return this.etatGlobale; }
  public getNbProduit(): number { return this.produits.length; }

  // Mutators (Setters)
  public setNumero(numero: string): void { this.numero = numero; }
  public setPoidsMax(poidsMax: number): void { this.poidsMax = poidsMax; }
  public setLieuDepart(lieuDepart: string): void { this.lieuDepart = lieuDepart; }
  public setLieuArrivee(lieuArrivee: string): void { this.lieuArrivee = lieuArrivee; }
  public setDistanceKm(distanceKm: number): void { this.distanceKm = distanceKm; }
  public setEtatAvancement(etatAvancement: EtatAvancement): void { this.etatAvancement = etatAvancement; }

  public fermerCargaison(): void {
      this.etatGlobale = "ferme";
      console.log(`Cargaison ${this.numero} est maintenant fermée.`);
  }

  public rouvrirCargaison(): void {
      if (this.etatAvancement === "en-attente") {
          this.etatGlobale = "ouvert";
          console.log(`Cargaison ${this.numero} est maintenant ouverte.`);
      } else {
          console.warn(`Impossible de rouvrir la cargaison ${this.numero}. Son état d'avancement n'est pas "en-attente".`);
      }
  }

  public ajouterProduit(produit: Produit): void {
      if (this.etatGlobale === "ferme") {
          console.warn(`Impossible d'ajouter un produit. La cargaison ${this.numero} est fermée.`);
          return;
      }
      if (this.produits.length >= this.MAX_PRODUCTS) {
          console.warn(`Impossible d'ajouter un produit. La cargaison ${this.numero} est pleine (max ${this.MAX_PRODUCTS} produits).`);
          return;
      }
      if (!this.isProduitCompatible(produit)) {
          console.warn(`Impossible d'ajouter le produit "${produit.getLibelle()}". Il n'est pas compatible avec le type de cargaison ${this.type}.`);
          return;
      }

      this.produits.push(produit);
      const fraisProduit = this.calculerFrais(produit);
      this.prixTotal += fraisProduit;
      console.log(`Produit "${produit.getLibelle()}" ajouté à la cargaison ${this.numero}. Frais pour ce produit: ${fraisProduit} F. Montant total de la cargaison: ${this.prixTotal} F.`);
  }

  protected abstract isProduitCompatible(produit: Produit): boolean;
  public abstract calculerFrais(produit: Produit): number;

  public sommeTotaleC(): number {
      return this.prixTotal;
  }

  public nbProduit(): number {
      return this.produits.length;
  }
}
