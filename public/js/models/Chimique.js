"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chimique = void 0;
const Produit_1 = require("./Produit");
class Chimique extends Produit_1.Produit {
    constructor(libelle, poids, degreToxicite) {
        super(libelle, poids);
        this.degreToxicite = degreToxicite;
    }
    // Accessors
    getDegreToxicite() {
        return this.degreToxicite;
    }
    // Mutators
    setDegreToxicite(degreToxicite) {
        this.degreToxicite = degreToxicite;
    }
    info() {
        return `Produit Chimique: ${this.libelle}, Poids: ${this.poids} kg, Toxicité: ${this.degreToxicite}`;
    }
}
exports.Chimique = Chimique;
