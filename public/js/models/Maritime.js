"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maritime = void 0;
const Cargaison_1 = require("./Cargaison");
const Chimique_1 = require("./Chimique");
const Fragile_1 = require("./Fragile");
class Maritime extends Cargaison_1.Cargaison {
    constructor(numero, poidsMax, lieuDepart, lieuArrivee, distanceKm, etatAvancement, etatGlobale) {
        super(numero, poidsMax, lieuDepart, lieuArrivee, distanceKm, "maritime", etatAvancement, etatGlobale);
        this.TARIF_KG_KM = 100;
        this.SURCHARGE_CHIMIQUE = 5000;
    }
    isProduitCompatible(produit) {
        // Cargaison Maritime n'accepte pas les produits fragiles
        if (produit instanceof Fragile_1.Fragile) {
            return false;
        }
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
exports.Maritime = Maritime;
