"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Produit = void 0;
class Produit {
    constructor(libelle, poids) {
        if (poids <= 0) {
            throw new Error("Le poids du produit doit être supérieur à zéro.");
        }
        this.libelle = libelle;
        this.poids = poids;
    }
    // Accessors (Getters)
    getLibelle() {
        return this.libelle;
    }
    getPoids() {
        return this.poids;
    }
    // Mutators (Setters)
    setLibelle(libelle) {
        this.libelle = libelle;
    }
    setPoids(poids) {
        if (poids <= 0) {
            throw new Error("Le poids du produit doit être supérieur à zéro.");
        }
        this.poids = poids;
    }
}
exports.Produit = Produit;
