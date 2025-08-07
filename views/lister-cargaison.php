<?php include __DIR__ . '/../templates/navigation.php'; ?>

       <!-- Filtres et Recherche -->
        <div class="bg-gray-800 rounded-2xl p-6 border border-cyan-500/20 mb-8 mt-12">
            <div class="flex flex-wrap items-center justify-between gap-4">
                <div class="flex items-center space-x-4">
                    <select id="type-filter" class="p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none">
                        <option value="">Tous les types</option>
                        <option value="maritime">Maritime</option>
                        <option value="aerienne">Aérienne</option>
                        <option value="routiere">Routière</option>
                    </select>
                    <select id="status-filter" class="p-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-cyan-400 focus:outline-none">
                        <option value="">Tous les états</option>
                        <option value="en-attente">En attente</option>
                        <option value="en-cours">En cours</option>
                        <option value="arrive">Arrivé</option>
                        <option value="recupere">Récupéré</option>
                        <option value="perdu">Perdu</option>
                        <option value="archive">Archivé</option>
                    </select>
                </div>
                <div class="flex items-center space-x-2">
                    <input type="text" id="search-input" placeholder="Rechercher par numéro, lieu..." class="p-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none">
                    <button onclick="searchCargo()" class="p-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Table des Cargaisons -->
        <div class="bg-gray-800 rounded-2xl border border-cyan-500/20 overflow-hidden px-12 py-8 ">
            <div class="p-6 border-b border-gray-700">
                <h3 class="text-xl font-bold text-white">Cargaisons Récentes</h3>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full">
                    <thead class="bg-gray-700">
                        <tr>
                            <th class="text-left p-4 text-cyan-400 font-semibold">Numéro</th>
                            <th class="text-left p-4 text-cyan-400 font-semibold">Type</th>
                            <th class="text-left p-4 text-cyan-400 font-semibold">Trajet</th>
                            <th class="text-left p-4 text-cyan-400 font-semibold">Poids/Max</th>
                            <th class="text-left p-4 text-cyan-400 font-semibold">État</th>
                            <th class="text-left p-4 text-cyan-400 font-semibold">Statut</th>
                            <th class="text-left p-4 text-cyan-400 font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="cargo-table-body">
                        <!-- Data will be loaded here by JavaScript -->
                    </tbody>
                </table>
            </div>
            <div class="p-4 border-t border-gray-700">
                <div class="flex items-center justify-between">
                    <span class="text-gray-400 text-sm">Affichage des cargaisons</span>
                    <div class="flex space-x-2">
                        <!-- Pagination can be implemented here with JS if needed -->
                        <button class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white text-sm hidden">Précédent</button>
                        <button class="px-3 py-1 bg-cyan-500 rounded text-white text-sm hidden">1</button>
                        <button class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white text-sm hidden">2</button>
                        <button class="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-white text-sm hidden">Suivant</button>
                    </div>
                </div>
            </div>
        </div>
