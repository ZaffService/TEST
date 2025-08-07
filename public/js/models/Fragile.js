"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fragile = void 0;
const Materiel_1 = require("./Materiel");
class Fragile extends Materiel_1.Materiel {
    constructor(libelle, poids) {
        super(libelle, poids);
    }
    info() {
        return `Matériel Fragile: ${this.libelle}, Poids: ${this.poids} kg`;
    }
}
exports.Fragile = Fragile;
