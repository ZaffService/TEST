"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Aerienne_1 = require("./models/Aerienne");
const Maritime_1 = require("./models/Maritime");
const Routiere_1 = require("./models/Routiere");
const Alimentaire_1 = require("./models/Alimentaire");
const Chimique_1 = require("./models/Chimique");
const Fragile_1 = require("./models/Fragile");
const Incassable_1 = require("./models/Incassable");
console.log("--- Test des classes de Cargaison et Produit ---");
// Création de produits
const produitAlimentaire1 = new Alimentaire_1.Alimentaire("Pommes", 5);
const produitChimique1 = new Chimique_1.Chimique("Acide Sulfurique", 10, "Élevé");
const produitFragile1 = new Fragile_1.Fragile("Vase en cristal", 2);
const produitIncassable1 = new Incassable_1.Incassable("Barre de fer", 50);
const produitAlimentaire2 = new Alimentaire_1.Alimentaire("Bananes", 3);
const produitChimique2 = new Chimique_1.Chimique("Désinfectant", 8, "Moyen");
const produitFragile2 = new Fragile_1.Fragile("Miroir", 7);
const produitIncassable2 = new Incassable_1.Incassable("Poutre en acier", 100);
console.log("\n--- Informations sur les produits ---");
console.log(produitAlimentaire1.info());
console.log(produitChimique1.info());
console.log(produitFragile1.info());
console.log(produitIncassable1.info());
// Création de cargaisons
const cargaisonAerienne = new Aerienne_1.Aerienne("AER-001", 1000, "Paris", "New York", 6000);
const cargaisonMaritime = new Maritime_1.Maritime("MAR-001", 50000, "Dakar", "Marseille", 4500);
const cargaisonRoutiere = new Routiere_1.Routiere("ROU-001", 5000, "Lyon", "Berlin", 1000);
console.log("\n--- Test Cargaison Aérienne (AER-001) ---");
cargaisonAerienne.ajouterProduit(produitAlimentaire1); // Compatible
cargaisonAerienne.ajouterProduit(produitChimique1); // Compatible
cargaisonAerienne.ajouterProduit(produitFragile1); // Compatible
cargaisonAerienne.ajouterProduit(produitIncassable1); // Compatible
console.log(`Nombre de produits dans AER-001: ${cargaisonAerienne.nbProduit()}`);
console.log(`Prix total de AER-001: ${cargaisonAerienne.sommeTotaleC()} F`);
console.log("\n--- Test Cargaison Maritime (MAR-001) ---");
cargaisonMaritime.ajouterProduit(produitAlimentaire2); // Compatible
cargaisonMaritime.ajouterProduit(produitChimique2); // Compatible
cargaisonMaritime.ajouterProduit(produitIncassable2); // Compatible
cargaisonMaritime.ajouterProduit(produitFragile2); // Incompatible (should show warning)
console.log(`Nombre de produits dans MAR-001: ${cargaisonMaritime.nbProduit()}`);
console.log(`Prix total de MAR-001: ${cargaisonMaritime.sommeTotaleC()} F`);
console.log("\n--- Test Cargaison Routière (ROU-001) ---");
cargaisonRoutiere.ajouterProduit(produitAlimentaire1); // Compatible
cargaisonRoutiere.ajouterProduit(produitFragile1); // Compatible
cargaisonRoutiere.ajouterProduit(produitChimique1); // Compatible
console.log(`Nombre de produits dans ROU-001: ${cargaisonRoutiere.nbProduit()}`);
console.log(`Prix total de ROU-001: ${cargaisonRoutiere.sommeTotaleC()} F`);
console.log("\n--- Test limites de cargaison et états ---");
const cargaisonTestPleine = new Aerienne_1.Aerienne("AER-FULL", 500, "A", "B", 100);
for (let i = 0; i < 10; i++) {
    cargaisonTestPleine.ajouterProduit(new Alimentaire_1.Alimentaire(`Produit ${i + 1}`, 1));
}
cargaisonTestPleine.ajouterProduit(new Alimentaire_1.Alimentaire("Produit 11", 1)); // Should be rejected (full)
const cargaisonTestFermee = new Aerienne_1.Aerienne("AER-CLOSED", 500, "C", "D", 100, "en-cours", "ferme");
cargaisonTestFermee.ajouterProduit(new Alimentaire_1.Alimentaire("Produit Fermé", 1)); // Should be rejected (closed)
const cargaisonTestRouvrir = new Aerienne_1.Aerienne("AER-REOPEN", 500, "E", "F", 100, "arrive", "ferme");
cargaisonTestRouvrir.rouvrirCargaison(); // Should be rejected (not en-attente)
cargaisonTestRouvrir.setEtatAvancement("en-attente");
cargaisonTestRouvrir.rouvrirCargaison(); // Should be successful
