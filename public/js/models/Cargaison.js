"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cargaison = void 0;
class Cargaison {
    constructor(numero, poidsMax, lieuDepart, lieuArrivee, distanceKm, type, etatAvancement = "en-attente", etatGlobale = "ouvert") {
        this.produits = [];
        this.prixTotal = 0;
        this.MAX_PRODUCTS = 10;
        this.MIN_PACKAGE_PRICE = 10000; // 10.000 F
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
    getNumero() { return this.numero; }
    getPoidsMax() { return this.poidsMax; }
    getProduits() { return this.produits; }
    getPrixTotal() { return this.prixTotal; }
    getLieuDepart() { return this.lieuDepart; }
    getLieuArrivee() { return this.lieuArrivee; }
    getDistanceKm() { return this.distanceKm; }
    getType() { return this.type; }
    getEtatAvancement() { return this.etatAvancement; }
    getEtatGlobale() { return this.etatGlobale; }
    getNbProduit() { return this.produits.length; }
    // Mutators (Setters)
    setNumero(numero) { this.numero = numero; }
    setPoidsMax(poidsMax) { this.poidsMax = poidsMax; }
    setLieuDepart(lieuDepart) { this.lieuDepart = lieuDepart; }
    setLieuArrivee(lieuArrivee) { this.lieuArrivee = lieuArrivee; }
    setDistanceKm(distanceKm) { this.distanceKm = distanceKm; }
    setEtatAvancement(etatAvancement) { this.etatAvancement = etatAvancement; }
    fermerCargaison() {
        this.etatGlobale = "ferme";
        console.log(`Cargaison ${this.numero} est maintenant fermée.`);
    }
    rouvrirCargaison() {
        if (this.etatAvancement === "en-attente") {
            this.etatGlobale = "ouvert";
            console.log(`Cargaison ${this.numero} est maintenant ouverte.`);
        }
        else {
            console.warn(`Impossible de rouvrir la cargaison ${this.numero}. Son état d'avancement n'est pas "en-attente".`);
        }
    }
    ajouterProduit(produit) {
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
    sommeTotaleC() {
        return this.prixTotal;
    }
    nbProduit() {
        return this.produits.length;
    }
}
exports.Cargaison = Cargaison;
