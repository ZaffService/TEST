<div class="flex">
  <a href="creation-cargaison" class="mt-2 ml-auto px-3 pb-3 bg-cyan-400 hover:bg-cyan-600 rounded-xl font-semibold text-white border border-cyan-500 transition-colors duration-300 ">
    <i class="fas fa-sign-in-alt pt-3"></i> Connexion Gestionnaire
  </a>
</div>

<!-- Suivi Colis Section (for clients, no login) -->
<section id="suivi" class="py-16 bg-gray-800/30">
<div class="container mx-auto px-6">
    <div class="text-center mb-12">
        <div class="inline-block p-3 bg-cyan-500/10 rounded-xl border border-yellow-500/30 mb-4"><i class="fas fa-search text-3xl text-cyan-400"></i></div>
        <h2 class="text-4xl font-bold mb-4 text-white"><span class="text-cyan-400">Suivi</span> de Colis</h2>
        <p class="text-white-400 text-lg">Suivez l'état de votre colis en temps réel</p>
    </div>
    <div class="max-w-2xl mx-auto">
        <div class="bg-gray-800 rounded-3xl p-8 border border-cyan-500/20 hover:border-cyan-400 transition-colors duration-300">
            <div class="space-y-6">
                <div>
                    <label for="tracking-code" class="block text-cyan-400 font-semibold mb-3 text-lg"><i class="fas fa-barcode mr-2"></i> Code de Suivi</label>
                    <input type="text" id="tracking-code" name="tracking-code" placeholder="Entrez votre code de suivi" class="w-full p-4 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors duration-300">
                </div>
                <button id="search-tracking-btn" class="w-full py-4 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-white font-semibold transition-colors duration-300 shadow-lg shadow-cyan-500/25"><i class="fas fa-search mr-2"></i> Rechercher Colis</button>
                <div class="border-t border-gray-700 pt-6">
                    <h3 class="text-gray-300 font-semibold mb-4">États possibles du colis :</h3>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div class="p-3 bg-yellow-900/30 rounded-lg border border-yellow-500/30 text-center"><span class="text-yellow-400 font-medium text-sm">En attente</span></div>
                        <div class="p-3 bg-blue-900/30 rounded-lg border border-blue-500/30 text-center"><span class="text-blue-400 font-medium text-sm">En cours</span></div>
                        <div class="p-3 bg-green-900/30 rounded-lg border border-green-500/30 text-center"><span class="text-green-400 font-medium text-sm">Arrivé</span></div>
                        <div class="p-3 bg-purple-900/30 rounded-lg border border-purple-500/30 text-center"><span class="text-purple-400 font-medium text-sm">Récupéré</span></div>
                        <div class="p-3 bg-red-900/30 rounded-lg border border-red-500/30 text-center"><span class="text-red-400 font-medium text-sm">Perdu</span></div>
                        <div class="p-3 bg-gray-700/50 rounded-lg border border-gray-500/30 text-center"><span class="text-gray-400 font-medium text-sm">Archivé</span></div>
                    </div>
                </div>
                <div class="mt-8 p-6 bg-gray-700 rounded-xl border border-yellow-600/30 hidden" id="tracking-result">
                    <h4 class="text-xl font-bold text-yellow-300 mb-4">Détails du Colis: <span class="text-white" id="tracking-result-code"></span></h4>
                    <div class="space-y-3 text-gray-300">
                        <p><span class="font-semibold">État actuel:</span> <span class="text-blue-400" id="tracking-result-status"></span></p>
                        <p><span class="font-semibold">Arrivée estimée:</span> <span class="text-green-400" id="tracking-result-eta"></span></p>
                        <p><span class="font-semibold">Lieu de départ:</span> <span id="tracking-result-departure"></span></p>
                        <p><span class="font-semibold">Lieu d'arrivée:</span> <span id="tracking-result-arrival"></span></p>
                        <p><span class="font-semibold">Type de cargaison:</span> <span id="tracking-result-cargo-type"></span></p>
                        <p class="text-sm text-gray-400 mt-4" id="tracking-result-message"></p>
                    </div>
                </div>
                <div class="mt-8 p-6 bg-red-900/30 rounded-xl border border-red-500/30 hidden" id="tracking-error">
                    <p class="text-red-400 font-semibold text-center"><i class="fas fa-exclamation-triangle mr-2"></i> Le code de suivi n'existe pas ou le colis a été annulé.</p>
                </div>
            </div>
        </div>
    </div>
</div>
</section>
