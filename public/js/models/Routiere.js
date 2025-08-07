"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routiere = void 0;
const Cargaison_1 = require("./Cargaison");
const Chimique_1 = require("./Chimique");
class Routiere extends Cargaison_1.Cargaison {
    constructor(numero, poidsMax, lieuDepart, lieuArrivee, distanceKm, etatAvancement, etatGlobale) {
        super(numero, poidsMax, lieuDepart, lieuArrivee, distanceKm, "routiere", etatAvancement, etatGlobale);
        this.TARIF_KG_KM = 90;
        this.SURCHARGE_CHIMIQUE = 5000;
    }
    isProduitCompatible(produit) {
        // Cargaison Routière accepte tous les types de produits
        return true;
    }
    calculerFrais(produit) {
        let frais = produit.getPoids() * this.distanceKm * this.TARIF_KG_KM;
        if (produit instanceof Chimique_1.Chimique) {
            frais += this.SURCHARGE_CHIMIQUE;
        }
        // Apply minimum price rule
        return Math.max(frais, this.MIN_PACKAGE_PRICE);
    }
}
exports.Routiere = Routiere;
