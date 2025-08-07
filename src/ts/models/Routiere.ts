import { Cargaison, TypeCargaison } from './Cargaison';
import { Produit } from './Produit';
import { Chimique } from './Chimique';
import { Fragile } from './Fragile';
import { Alimentaire } from './Alimentaire';
import { Incassable } from './Incassable';

export class Routiere extends Cargaison {
  private readonly TARIF_KG_KM: number = 90;
  private readonly SURCHARGE_CHIMIQUE: number = 5000;

  constructor(
      numero: string,
      poidsMax: number,
      lieuDepart: string,
      lieuArrivee: string,
      distanceKm: number,
      etatAvancement?: Cargaison['etatAvancement'],
      etatGlobale?: Cargaison['etatGlobale']
  ) {
      super(numero, poidsMax, lieuDepart, lieuArrivee, distanceKm, "routiere", etatAvancement, etatGlobale);
  }

  protected isProduitCompatible(produit: Produit): boolean {
      // Cargaison Routière accepte tous les types de produits
      return true;
  }

  public calculerFrais(produit: Produit): number {
      let frais = produit.getPoids() * this.distanceKm * this.TARIF_KG_KM;
      if (produit instanceof Chimique) {
          frais += this.SURCHARGE_CHIMIQUE;
      }
      // Apply minimum price rule
      return Math.max(frais, this.MIN_PACKAGE_PRICE);
  }
}
