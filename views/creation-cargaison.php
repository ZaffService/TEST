<?php include __DIR__ . '/../templates/navigation.php'; ?>

<!-- Section: Dashboard Interactif -->
<section id="dashboard-cargaison" class="py-16 bg-gray-800/30 pt-18">
    <div class="container mx-auto px-6">
        <!-- Header du Dashboard -->
        <div class="text-center mb-12">
           
            <h2 class="text-4xl font-bold mb-4 text-white">Dashboard de <span class="text-cyan-400 mt-">Gestion</span></h2>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div class="bg-gray-800 rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300 cursor-pointer" onclick="filterByStatus('en-attente')">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-400 text-sm">En Attente</p>
                        <p class="text-2xl font-bold text-orange-400" id="pending-count">0</p>
                        <p class="text-xs text-orange-300 mt-1">Cargaisons ouvertes</p>
                    </div>
                    <div class="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                        <i class="fas fa-clock text-orange-400 text-xl"></i>
                    </div>
                </div>
            </div>
            
            <div class="bg-gray-800 rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300 cursor-pointer" onclick="filterByStatus('en-cours')">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-400 text-sm">En Cours</p>
                        <p class="text-2xl font-bold text-blue-400" id="ongoing-count">0</p>
                        <p class="text-xs text-blue-300 mt-1">Transit actif</p>
                    </div>
                    <div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                        <i class="fas fa-truck text-blue-400 text-xl"></i>
                    </div>
                </div>
            </div>
            
            <div class="bg-gray-800 rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300 cursor-pointer" onclick="filterByStatus('arrive')">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-400 text-sm">Arrivées</p>
                        <p class="text-2xl font-bold text-green-400" id="arrived-count">0</p>
                        <p class="text-xs text-green-300 mt-1">À récupérer</p>
                    </div>
                    <div class="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                        <i class="fas fa-check-circle text-green-400 text-xl"></i>
                    </div>
                </div>
            </div>
            
            <div class="bg-gray-800 rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300 cursor-pointer" onclick="filterByStatus('perdu')">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-gray-400 text-sm">Problèmes</p>
                        <p class="text-2xl font-bold text-red-400" id="issues-count">0</p>
                        <p class="text-xs text-red-300 mt-1">Perdus/Retards</p>
                    </div>
                    <div class="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                        <i class="fas fa-exclamation-triangle text-red-400 text-xl"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Section: Création de Cargaison -->
<section id="creation-cargaison" class="py-8 bg-gray-800/30">
    <div class="container mx-auto px-6">
        
        <div class="w-full bg-gray-800 rounded-3xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-colors duration-300">
            <form id="create-cargo-form" class="space-y-4">
                <!-- Section 1: Informations Principales -->
                <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div>
                        <label for="cargo-number" class="block text-cyan-400 font-semibold mb-1 text-sm">Numéro de Cargaison</label>
                        <input type="text" id="cargo-number" name="cargo-number" placeholder="Ex: CARG-2024-001" class="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none text-sm" required>
                    </div>
                    
                    <div>
                        <label for="cargo-weight-max" class="block text-cyan-400 font-semibold mb-1 text-sm">Poids Max (kg)</label>
                        <input type="number" id="cargo-weight-max" name="cargo-weight-max" placeholder="Ex: 5000" class="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none text-sm" min="1" required>
                    </div>
                    
                    <div>
                        <label for="cargo-type" class="block text-cyan-400 font-semibold mb-1 text-sm">Type de Cargaison</label>
                        <select id="cargo-type" name="cargo-type" class="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none text-sm" required>
                            <option value="">Sélectionnez un type</option>
                            <option value="maritime">Maritime</option>
                            <option value="aerienne">Aérienne</option>
                            <option value="routiere">Routière</option>
                        </select>
                    </div>
                    
                    <div>
                        <label for="distance-km" class="block text-cyan-400 font-semibold mb-1 text-sm">Distance (Km)</label>
                        <input type="number" id="distance-km" name="distance-km" placeholder="Ex: 6000" class="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none text-sm" min="1" required>
                    </div>
                </div>
                
                <!-- Section 2: Locations et États -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label for="departure-location" class="block text-cyan-400 font-semibold mb-1 text-sm">Lieu de Départ</label>
                        <input type="text" id="departure-location" name="departure-location" placeholder="Ex: Paris" class="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none text-sm" required>
                    </div>
                    <div>
                        <label for="arrival-location" class="block text-cyan-400 font-semibold mb-1 text-sm">Lieu d'Arrivée</label>
                        <input type="text" id="arrival-location" name="arrival-location" placeholder="Ex: New York" class="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none text-sm" required>
                    </div>
                    <div>
                        <label for="advancement-status" class="block text-cyan-400 font-semibold mb-1 text-sm">État d'Avancement</label>
                        <select id="advancement-status" name="advancement-status" class="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none text-sm" required>
                            <option value="en-attente">En attente</option>
                            <option value="en-cours">En cours</option>
                            <option value="arrive">Arrivé</option>
                            <option value="recupere">Récupéré</option>
                            <option value="perdu">Perdu</option>
                            <option value="archive">Archivé</option>
                        </select>
                    </div>
                    <div>
                        <label for="global-status" class="block text-cyan-400 font-semibold mb-1 text-sm">État Global</label>
                        <select id="global-status" name="global-status" class="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none text-sm" required>
                            <option value="ouvert">Ouvert</option>
                            <option value="ferme">Fermé</option>
                        </select>
                    </div>
                </div>
                
                <!-- Section 3: Produits -->
                <div class="border-t border-gray-700 pt-4">
                    <div class="flex items-center justify-between mb-3">
                        <div>
                            <h3 class="text-lg font-bold text-white">Produits dans la Cargaison</h3>
                            <p class="text-gray-400 text-xs">Maximum 10 produits par cargaison</p>
                        </div>
                        <button type="button" id="add-product-btn" class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white text-sm font-semibold">
                            <i class="fas fa-plus mr-2"></i> Ajouter
                        </button>
                    </div>
                    <div id="products-container" class="space-y-3 max-h-32 overflow-y-auto">
                        <!-- Product fields will be added here by JavaScript -->
                    </div>
                </div>
                
                <!-- Section 4: Actions -->
                <div class="flex justify-end space-x-4 pt-4 border-t border-gray-700">
                    <button type="button" class="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-semibold transition-colors duration-300">
                        <i class="fas fa-times mr-2"></i> Annuler
                    </button>
                    <button type="submit" class="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-semibold transition-colors duration-300 shadow-lg shadow-cyan-500/25">
                        <i class="fas fa-save mr-2"></i> Enregistrer
                    </button>
                </div>
            </form>
        </div>
    </div>
</section>
