"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/ts/main.ts - Logique TypeScript pour les interactions côté client.
const Aerienne_1 = require("./models/Aerienne");
const Maritime_1 = require("./models/Maritime");
const Routiere_1 = require("./models/Routiere");
const Alimentaire_1 = require("./models/Alimentaire");
const Chimique_1 = require("./models/Chimique");
const Fragile_1 = require("./models/Fragile");
const Incassable_1 = require("./models/Incassable");
const auth_1 = require("./auth");
const JSON_SERVER_URL = 'http://localhost:3001'; // URL de votre JSON Server
document.addEventListener('DOMContentLoaded', () => {
    const auth = auth_1.AuthManager.getInstance();
    // --- Helper Functions ---
    function fetchData(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return yield response.json();
            }
            catch (error) {
                console.error('Error fetching data:', error);
                return null;
            }
        });
    }
    function postData(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return yield response.json();
            }
            catch (error) {
                console.error('Error posting data:', error);
                return null;
            }
        });
    }
    function patchData(url, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(url, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return yield response.json();
            }
            catch (error) {
                console.error('Error patching data:', error);
                return null;
            }
        });
    }
    // --- 1. Logique de suivi de colis (present on landing.php) ---
    const trackingCodeInput = document.getElementById('tracking-code');
    const searchTrackingBtn = document.getElementById('search-tracking-btn');
    const trackingResultDiv = document.getElementById('tracking-result');
    const trackingErrorDiv = document.getElementById('tracking-error');
    if (searchTrackingBtn) {
        searchTrackingBtn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
            const code = trackingCodeInput.value.trim();
            trackingResultDiv.classList.add('hidden');
            trackingErrorDiv.classList.add('hidden');
            if (!code) {
                alert('Veuillez entrer un code de suivi.');
                return;
            }
            const colis = yield fetchData(`${JSON_SERVER_URL}/colis?code=${code}`);
            if (colis && colis.length > 0) {
                const data = colis[0];
                document.getElementById('tracking-result-code').innerText = data.code;
                document.getElementById('tracking-result-status').innerText = data.status;
                // Fetch cargo details for ETA, departure, arrival, cargoType
                const cargo = yield fetchData(`${JSON_SERVER_URL}/cargaisons/${data.cargoId}`);
                if (cargo) {
                    document.getElementById('tracking-result-eta').innerText = 'Non disponible (simulé)'; // ETA is not in db.json
                    document.getElementById('tracking-result-departure').innerText = cargo.lieuDepart;
                    document.getElementById('tracking-result-arrival').innerText = cargo.lieuArrivee;
                    document.getElementById('tracking-result-cargo-type').innerText = cargo.type;
                    document.getElementById('tracking-result-message').innerText = `Ce colis est actuellement en ${data.status.toLowerCase()} via une cargaison ${cargo.type}.`;
                }
                else {
                    document.getElementById('tracking-result-eta').innerText = 'N/A';
                    document.getElementById('tracking-result-departure').innerText = 'N/A';
                    document.getElementById('tracking-result-arrival').innerText = 'N/A';
                    document.getElementById('tracking-result-cargo-type').innerText = 'N/A';
                    document.getElementById('tracking-result-message').innerText = 'Détails de la cargaison non trouvés.';
                }
                trackingResultDiv.classList.remove('hidden');
            }
            else {
                trackingErrorDiv.classList.remove('hidden');
            }
        }));
    }
    // --- 2. Logique d'ajout dynamique de produits et soumission de cargaison (present on creation-cargaison.php) ---
    const addProductBtn = document.getElementById('add-product-btn');
    const productsContainer = document.getElementById('products-container');
    let productCount = 0; // Compteur pour les produits ajoutés
    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => {
            if (productCount >= 10) {
                alert('Vous ne pouvez pas ajouter plus de 10 produits par cargaison.');
                return;
            }
            productCount++;
            const productId = productCount;
            const productHtml = `
              <div class="space-y-4 bg-gray-700/50 p-4 rounded-lg border border-gray-600" id="product-block-${productId}">
                  <div>
                      <label for="product-type-${productId}" class="block text-gray-300 font-semibold mb-2">Type de Produit ${productId}</label>
                      <select id="product-type-${productId}" name="product-type-${productId}" class="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg text-white focus:border-cyan-400 focus:outline-none">
                          <option value="">Sélectionnez un type</option>
                          <option value="alimentaire">Alimentaire</option>
                          <option value="chimique">Chimique</option>
                          <option value="materiel-fragile">Matériel Fragile</option>
                          <option value="materiel-incassable">Matériel Incassable</option>
                      </select>
                  </div>
                  <div>
                      <label for="product-weight-${productId}" class="block text-gray-300 font-semibold mb-2">Poids Produit ${productId} (kg)</label>
                      <input type="number" id="product-weight-${productId}" name="product-weight-${productId}" placeholder="Poids du produit" class="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none" min="0.1" step="0.1">
                  </div>
                  <div>
                      <label for="product-label-${productId}" class="block text-gray-300 font-semibold mb-2">Libellé Produit ${productId}</label>
                      <input type="text" id="product-label-${productId}" name="product-label-${productId}" placeholder="Description du produit" class="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none">
                  </div>
                  <div class="hidden" id="toxicity-field-${productId}">
                      <label for="product-toxicity-${productId}" class="block text-gray-300 font-semibold mb-2">Degré de Toxicité (Produit Chimique)</label>
                      <input type="text" id="product-toxicity-${productId}" name="product-toxicity-${productId}" placeholder="Ex: Faible, Moyen, Élevé" class="w-full p-3 bg-gray-600 border border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none">
                  </div>
                  <button type="button" class="remove-product-btn px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-white text-sm font-semibold" data-product-id="${productId}"><i class="fas fa-trash-alt mr-2"></i> Supprimer</button>
              </div>
          `;
            productsContainer.insertAdjacentHTML('beforeend', productHtml);
            const productTypeSelect = document.getElementById(`product-type-${productId}`);
            productTypeSelect.addEventListener('change', () => {
                const toxicityField = document.getElementById(`toxicity-field-${productId}`);
                if (productTypeSelect.value === 'chimique') {
                    toxicityField.classList.remove('hidden');
                }
                else {
                    toxicityField.classList.add('hidden');
                }
            });
            const removeBtn = document.querySelector(`#product-block-${productId} .remove-product-btn`);
            removeBtn.addEventListener('click', (event) => {
                const target = event.target;
                const idToRemove = target.dataset.productId;
                const productBlock = document.getElementById(`product-block-${idToRemove}`);
                if (productBlock) {
                    productBlock.remove();
                    productCount--;
                }
            });
        });
    }
    const createCargoForm = document.getElementById('create-cargo-form');
    if (createCargoForm) {
        createCargoForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
            event.preventDefault();
            const formData = new FormData(createCargoForm);
            const cargoType = formData.get('cargo-type');
            const cargoNumber = formData.get('cargo-number');
            const cargoWeightMax = parseFloat(formData.get('cargo-weight-max'));
            const departureLocation = formData.get('departure-location');
            const arrivalLocation = formData.get('arrival-location');
            const distanceKm = parseFloat(formData.get('distance-km'));
            const advancementStatus = formData.get('advancement-status');
            const globalStatus = formData.get('global-status');
            if (!cargoNumber || !cargoWeightMax || !departureLocation || !arrivalLocation || !distanceKm || !cargoType) {
                alert('Veuillez remplir tous les champs obligatoires de la cargaison.');
                return;
            }
            const products = [];
            for (let i = 1; i <= productCount; i++) {
                const productType = formData.get(`product-type-${i}`);
                const productWeight = parseFloat(formData.get(`product-weight-${i}`));
                const productLabel = formData.get(`product-label-${i}`);
                const productToxicity = formData.get(`product-toxicity-${i}`);
                if (!productType || !productWeight || !productLabel) {
                    alert(`Veuillez remplir tous les champs pour le produit ${i}.`);
                    return;
                }
                if (productType === 'chimique' && !productToxicity) {
                    alert(`Veuillez spécifier le degré de toxicité pour le produit chimique ${i}.`);
                    return;
                }
                let productData = { libelle: productLabel, poids: productWeight, type: productType };
                if (productType === 'chimique') {
                    productData.degreToxicite = productToxicity;
                }
                products.push(productData);
            }
            let newCargoInstance = null;
            try {
                if (cargoType === 'aerienne') {
                    newCargoInstance = new Aerienne_1.Aerienne(cargoNumber, cargoWeightMax, departureLocation, arrivalLocation, distanceKm, advancementStatus, globalStatus);
                }
                else if (cargoType === 'maritime') {
                    newCargoInstance = new Maritime_1.Maritime(cargoNumber, cargoWeightMax, departureLocation, arrivalLocation, distanceKm, advancementStatus, globalStatus);
                }
                else if (cargoType === 'routiere') {
                    newCargoInstance = new Routiere_1.Routiere(cargoNumber, cargoWeightMax, departureLocation, arrivalLocation, distanceKm, advancementStatus, globalStatus);
                }
                else {
                    alert("Type de cargaison non valide.");
                    return;
                }
                // Add products to the instance to calculate total price and check compatibility
                let totalCalculatedPrice = 0;
                for (const pData of products) {
                    let product = null;
                    if (pData.type === 'alimentaire')
                        product = new Alimentaire_1.Alimentaire(pData.libelle, pData.poids);
                    else if (pData.type === 'chimique')
                        product = new Chimique_1.Chimique(pData.libelle, pData.poids, pData.degreToxicite);
                    else if (pData.type === 'materiel-fragile')
                        product = new Fragile_1.Fragile(pData.libelle, pData.poids);
                    else if (pData.type === 'materiel-incassable')
                        product = new Incassable_1.Incassable(pData.libelle, pData.poids);
                    if (product) {
                        // This will also check compatibility and add to newCargoInstance.produits
                        newCargoInstance.ajouterProduit(product);
                        totalCalculatedPrice += newCargoInstance.calculerFrais(product); // Sum up individual product costs
                    }
                }
                const cargoDataToSave = {
                    id: cargoNumber, // Using cargo number as ID for JSON Server
                    numero: cargoNumber,
                    poidsMax: cargoWeightMax,
                    lieuDepart: departureLocation,
                    lieuArrivee: arrivalLocation,
                    distanceKm: distanceKm,
                    type: cargoType,
                    etatAvancement: advancementStatus,
                    etatGlobale: globalStatus,
                    produits: products, // Store raw product data
                    prixTotal: newCargoInstance.getPrixTotal() // Use the calculated total from the instance
                };
                const result = yield postData(`${JSON_SERVER_URL}/cargaisons`, cargoDataToSave);
                if (result) {
                    alert(`Cargaison ${result.numero} créée avec succès! Total: ${result.prixTotal} F`);
                    createCargoForm.reset();
                    productsContainer.innerHTML = ''; // Clear products
                    productCount = 0;
                    updateDashboardCounts(); // Update dashboard counts after creation
                }
                else {
                    alert('Échec de la création de la cargaison.');
                }
            }
            catch (error) {
                alert(`Erreur lors de la création de la cargaison: ${error.message}`);
                console.error(error);
            }
        }));
    }
    // Dashboard counts update
    const pendingCount = document.getElementById('pending-count');
    const ongoingCount = document.getElementById('ongoing-count');
    const arrivedCount = document.getElementById('arrived-count');
    const issuesCount = document.getElementById('issues-count');
    function updateDashboardCounts() {
        return __awaiter(this, void 0, void 0, function* () {
            const cargaisons = yield fetchData(`${JSON_SERVER_URL}/cargaisons`);
            if (cargaisons) {
                const counts = {
                    'en-attente': 0,
                    'en-cours': 0,
                    'arrive': 0,
                    'perdu': 0 // Assuming 'perdu' is an issue
                };
                cargaisons.forEach(c => {
                    if (c.etatAvancement in counts) {
                        counts[c.etatAvancement]++;
                    }
                });
                if (pendingCount)
                    pendingCount.innerText = counts['en-attente'].toString();
                if (ongoingCount)
                    ongoingCount.innerText = counts['en-cours'].toString();
                if (arrivedCount)
                    arrivedCount.innerText = counts['arrive'].toString();
                if (issuesCount)
                    issuesCount.innerText = counts['perdu'].toString();
            }
        });
    }
    // Call on page load for creation-cargaison.php
    if (createCargoForm) { // Check if on creation-cargaison page
        updateDashboardCounts();
    }
    // --- 3. Logique d'enregistrement de colis client (present on enregistrement-colis.php) ---
    const registerPackageForm = document.getElementById('register-package-form');
    if (registerPackageForm) {
        registerPackageForm.addEventListener('submit', (event) => __awaiter(void 0, void 0, void 0, function* () {
            event.preventDefault();
            const formData = new FormData(registerPackageForm);
            const clientNom = formData.get('client-nom');
            const clientPrenom = formData.get('client-prenom');
            const clientPhone = formData.get('client-phone');
            const clientAddress = formData.get('client-address');
            const clientEmail = formData.get('client-email');
            const packageCount = parseInt(formData.get('package-count'));
            const packageWeight = parseFloat(formData.get('package-weight'));
            const packageProductType = formData.get('package-product-type');
            const packageCargoType = formData.get('package-cargo-type');
            const recipientEmailSms = formData.get('recipient-email-sms');
            if (!clientNom || !clientPrenom || !clientPhone || !clientAddress || !packageCount || !packageWeight || !packageProductType || !packageCargoType || !recipientEmailSms) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return;
            }
            // Generate a unique tracking code
            const trackingCode = `PKG-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
            const colisData = {
                id: trackingCode, // Use tracking code as ID
                code: trackingCode,
                status: 'en-attente', // Default status for new package
                cargoId: null, // Will be assigned later by a manager
                client: {
                    nom: clientNom,
                    prenom: clientPrenom,
                    phone: clientPhone,
                    address: clientAddress,
                    email: clientEmail
                },
                packageInfo: {
                    count: packageCount,
                    weight: packageWeight,
                    productType: packageProductType,
                    cargoType: packageCargoType,
                    recipientContact: recipientEmailSms
                }
            };
            const result = yield postData(`${JSON_SERVER_URL}/colis`, colisData);
            if (result) {
                alert(`Colis enregistré avec succès! Code de suivi: ${result.code}. Un reçu a été généré.`);
                registerPackageForm.reset();
            }
            else {
                alert('Échec de l\'enregistrement du colis.');
            }
        }));
    }
    // --- 4. Logique de recherche et gestionnaire (present on outils-gestionnaire.php) ---
    const searchPackageBtn = document.getElementById('search-package-btn');
    const searchPackageCodeInput = document.getElementById('search-package-code');
    const packageSearchResultDiv = document.getElementById('package-search-result');
    const packageSearchResultCode = document.getElementById('package-search-result-code');
    const packageSearchResultStatus = document.getElementById('package-search-result-status');
    const packageSearchResultCargo = document.getElementById('package-search-result-cargo');
    if (searchPackageBtn) {
        searchPackageBtn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
            const code = searchPackageCodeInput.value.trim();
            packageSearchResultDiv.classList.add('hidden');
            if (!code) {
                alert('Veuillez entrer un code de colis.');
                return;
            }
            const colis = yield fetchData(`${JSON_SERVER_URL}/colis?code=${code}`);
            if (colis && colis.length > 0) {
                const data = colis[0];
                packageSearchResultCode.innerText = data.code;
                packageSearchResultStatus.innerText = data.status;
                packageSearchResultCargo.innerText = data.cargoId ? data.cargoId : 'Non assigné';
                packageSearchResultDiv.classList.remove('hidden');
                // Attach event listeners to action buttons for this specific package
                document.querySelectorAll('#package-search-result button').forEach(button => {
                    button.onclick = () => __awaiter(void 0, void 0, void 0, function* () {
                        let newStatus = null;
                        if (button.innerText.includes('Récupéré'))
                            newStatus = 'recupere';
                        else if (button.innerText.includes('Perdu'))
                            newStatus = 'perdu';
                        else if (button.innerText.includes('Archiver'))
                            newStatus = 'archive';
                        if (newStatus) {
                            const updatedColis = yield patchData(`${JSON_SERVER_URL}/colis/${data.id}`, { status: newStatus });
                            if (updatedColis) {
                                alert(`Statut du colis ${updatedColis.code} mis à jour à: ${updatedColis.status}`);
                                packageSearchResultStatus.innerText = updatedColis.status; // Update displayed status
                            }
                            else {
                                alert('Échec de la mise à jour du statut du colis.');
                            }
                        }
                    });
                });
                const statusSelect = document.querySelector('#package-search-result select');
                if (statusSelect) {
                    statusSelect.value = data.status; // Set current status
                    statusSelect.onchange = () => __awaiter(void 0, void 0, void 0, function* () {
                        const newStatus = statusSelect.value;
                        if (newStatus) {
                            const updatedColis = yield patchData(`${JSON_SERVER_URL}/colis/${data.id}`, { status: newStatus });
                            if (updatedColis) {
                                alert(`Statut du colis ${updatedColis.code} mis à jour à: ${updatedColis.status}`);
                                packageSearchResultStatus.innerText = updatedColis.status;
                            }
                            else {
                                alert('Échec de la mise à jour du statut du colis.');
                            }
                        }
                    });
                }
            }
            else {
                alert('Colis non trouvé.');
            }
        }));
    }
    const searchCargoBtn = document.getElementById('search-cargo-btn');
    const searchCargoCodeInput = document.getElementById('search-cargo-code');
    const cargoSearchResultDiv = document.getElementById('cargo-search-result');
    const cargoSearchResultCode = document.getElementById('cargo-search-result-code');
    const cargoSearchResultType = document.getElementById('cargo-search-result-type');
    const cargoSearchResultRoute = document.getElementById('cargo-search-result-route');
    const cargoSearchResultAdvancement = document.getElementById('cargo-search-result-advancement');
    const cargoSearchResultGlobalStatus = document.getElementById('cargo-search-result-global-status');
    if (searchCargoBtn) {
        searchCargoBtn.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
            const code = searchCargoCodeInput.value.trim();
            cargoSearchResultDiv.classList.add('hidden');
            if (!code) {
                alert('Veuillez entrer un numéro de cargaison.');
                return;
            }
            const cargaisons = yield fetchData(`${JSON_SERVER_URL}/cargaisons?numero=${code}`);
            if (cargaisons && cargaisons.length > 0) {
                const data = cargaisons[0];
                cargoSearchResultCode.innerText = data.numero;
                cargoSearchResultType.innerText = data.type;
                cargoSearchResultRoute.innerText = `${data.lieuDepart} → ${data.lieuArrivee}`;
                cargoSearchResultAdvancement.innerText = data.etatAvancement;
                cargoSearchResultGlobalStatus.innerText = data.etatGlobale;
                cargoSearchResultDiv.classList.remove('hidden');
                // Attach event listeners for cargo actions
                document.querySelectorAll('#cargo-search-result button').forEach(button => {
                    button.onclick = () => __awaiter(void 0, void 0, void 0, function* () {
                        let updateData = {};
                        if (button.innerText.includes('Fermer'))
                            updateData.etatGlobale = 'ferme';
                        else if (button.innerText.includes('Rouvrir'))
                            updateData.etatGlobale = 'ouvert';
                        else if (button.innerText.includes('Archiver'))
                            updateData.etatAvancement = 'archive';
                        if (Object.keys(updateData).length > 0) {
                            const updatedCargo = yield patchData(`${JSON_SERVER_URL}/cargaisons/${data.id}`, updateData);
                            if (updatedCargo) {
                                alert(`Statut de la cargaison ${updatedCargo.numero} mis à jour.`);
                                cargoSearchResultAdvancement.innerText = updatedCargo.etatAvancement;
                                cargoSearchResultGlobalStatus.innerText = updatedCargo.etatGlobale;
                            }
                            else {
                                alert('Échec de la mise à jour du statut de la cargaison.');
                            }
                        }
                    });
                });
                const statusSelect = document.querySelector('#cargo-search-result select');
                if (statusSelect) {
                    statusSelect.value = data.etatAvancement; // Set current status
                    statusSelect.onchange = () => __awaiter(void 0, void 0, void 0, function* () {
                        const newStatus = statusSelect.value;
                        if (newStatus) {
                            const updatedCargo = yield patchData(`${JSON_SERVER_URL}/cargaisons/${data.id}`, { etatAvancement: newStatus });
                            if (updatedCargo) {
                                alert(`Statut de la cargaison ${updatedCargo.numero} mis à jour à: ${updatedCargo.etatAvancement}`);
                                cargoSearchResultAdvancement.innerText = updatedCargo.etatAvancement;
                            }
                            else {
                                alert('Échec de la mise à jour du statut de la cargaison.');
                            }
                        }
                    });
                }
            }
            else {
                alert('Cargaison non trouvée.');
            }
        }));
    }
    // --- 5. Logique de listage des cargaisons (present on lister-cargaison.php) ---
    const cargoTableBody = document.getElementById('cargo-table-body');
    const typeFilter = document.getElementById('type-filter');
    const statusFilter = document.getElementById('status-filter');
    const searchInput = document.getElementById('search-input');
    let allCargaisons = []; // Store all cargaisons for filtering
    function loadAndRenderCargaisons() {
        return __awaiter(this, void 0, void 0, function* () {
            const cargaisons = yield fetchData(`${JSON_SERVER_URL}/cargaisons`);
            if (cargaisons) {
                allCargaisons = cargaisons;
                renderCargaisons(allCargaisons);
            }
        });
    }
    function renderCargaisons(cargaisonsToRender) {
        if (!cargoTableBody)
            return; // Ensure element exists
        cargoTableBody.innerHTML = ''; // Clear existing rows
        if (cargaisonsToRender.length === 0) {
            cargoTableBody.innerHTML = `<tr><td colspan="7" class="p-4 text-center text-gray-400">Aucune cargaison trouvée.</td></tr>`;
            return;
        }
        cargaisonsToRender.forEach(cargo => {
            const totalWeight = cargo.produits.reduce((sum, p) => sum + p.poids, 0);
            const typeColor = {
                'maritime': 'blue-400',
                'aerienne': 'cyan-400',
                'routiere': 'purple-400'
            }[cargo.type] || 'gray-400';
            const advancementColor = {
                'en-attente': 'orange-400',
                'en-cours': 'blue-400',
                'arrive': 'green-400',
                'recupere': 'purple-400',
                'perdu': 'red-400',
                'archive': 'gray-400'
            }[cargo.etatAvancement] || 'gray-400';
            const globalStatusColor = {
                'ouvert': 'green-400',
                'ferme': 'red-400'
            }[cargo.etatGlobale] || 'gray-400';
            const row = `
        <tr class="border-b border-gray-700 hover:bg-gray-700/50">
            <td class="p-4 text-white font-mono">${cargo.numero}</td>
            <td class="p-4">
                <span class="inline-block w-3 h-3 bg-${typeColor} rounded-full mr-2"></span>
                <span class="text-${typeColor}">${cargo.type.charAt(0).toUpperCase() + cargo.type.slice(1)}</span>
            </td>
            <td class="p-4 text-gray-300">${cargo.lieuDepart} → ${cargo.lieuArrivee}</td>
            <td class="p-4 text-gray-300">${totalWeight} / ${cargo.poidsMax} kg</td>
            <td class="p-4">
                <span class="px-2 py-1 bg-${advancementColor}/20 text-${advancementColor} rounded-lg text-xs font-semibold">${cargo.etatAvancement.charAt(0).toUpperCase() + cargo.etatAvancement.slice(1)}</span>
            </td>
            <td class="p-4">
                <span class="px-2 py-1 bg-${globalStatusColor}/20 text-${globalStatusColor} rounded-lg text-xs font-semibold">${cargo.etatGlobale.charAt(0).toUpperCase() + cargo.etatGlobale.slice(1)}</span>
            </td>
            <td class="p-4">
                <div class="flex space-x-2">
                    <button onclick="viewCargo('${cargo.id}')" class="p-1 text-cyan-400 hover:bg-cyan-500/20 rounded">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button onclick="editCargo('${cargo.id}')" class="p-1 text-yellow-400 hover:bg-yellow-500/20 rounded">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="toggleCargoStatus('${cargo.id}', '${cargo.etatGlobale}')" class="p-1 text-red-400 hover:bg-red-500/20 rounded">
                        <i class="fas fa-lock"></i>
                    </button>
                </div>
            </td>
        </tr>
      `;
            cargoTableBody.insertAdjacentHTML('beforeend', row);
        });
    }
    function filterAndSearchCargaisons() {
        let filteredCargaisons = allCargaisons;
        const selectedType = typeFilter.value;
        const selectedStatus = statusFilter.value;
        const searchTerm = searchInput.value.toLowerCase();
        if (selectedType) {
            filteredCargaisons = filteredCargaisons.filter(c => c.type === selectedType);
        }
        if (selectedStatus) {
            filteredCargaisons = filteredCargaisons.filter(c => c.etatAvancement === selectedStatus);
        }
        if (searchTerm) {
            filteredCargaisons = filteredCargaisons.filter(c => c.numero.toLowerCase().includes(searchTerm) ||
                c.lieuDepart.toLowerCase().includes(searchTerm) ||
                c.lieuArrivee.toLowerCase().includes(searchTerm));
        }
        renderCargaisons(filteredCargaisons);
    }
    if (typeFilter && statusFilter && searchInput) { // Check if on lister-cargaison page
        typeFilter.addEventListener('change', filterAndSearchCargaisons);
        statusFilter.addEventListener('change', filterAndSearchCargaisons);
        searchInput.addEventListener('input', filterAndSearchCargaisons);
        loadAndRenderCargaisons(); // Initial load
    }
    // Global functions for table actions (defined in global scope for onclick attributes)
    window.viewCargo = (id) => {
        alert(`Afficher les détails de la cargaison: ${id}`);
        // In a real app, you'd navigate to a detail page or open a modal
    };
    window.editCargo = (id) => {
        alert(`Modifier la cargaison: ${id}`);
        // In a real app, you'd navigate to an edit form pre-filled with data
    };
    window.toggleCargoStatus = (id, currentGlobalStatus) => __awaiter(void 0, void 0, void 0, function* () {
        const newStatus = currentGlobalStatus === 'ouvert' ? 'ferme' : 'ouvert';
        const confirmToggle = confirm(`Voulez-vous vraiment ${newStatus === 'ferme' ? 'fermer' : 'rouvrir'} la cargaison ${id}?`);
        if (confirmToggle) {
            const updatedCargo = yield patchData(`${JSON_SERVER_URL}/cargaisons/${id}`, { etatGlobale: newStatus });
            if (updatedCargo) {
                alert(`Cargaison ${updatedCargo.numero} est maintenant ${updatedCargo.etatGlobale}.`);
                loadAndRenderCargaisons(); // Re-render table to reflect change
                updateDashboardCounts(); // Update dashboard counts if on that page
            }
            else {
                alert('Échec de la mise à jour du statut global de la cargaison.');
            }
        }
    });
});
