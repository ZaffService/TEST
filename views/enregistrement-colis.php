<?php include __DIR__ . '/../templates/navigation.php'; ?>

<!-- Section: Enregistrement de Colis Client -->
<section id="enregistrement-colis" class="py-16 pt-32">
<div class="container mx-auto px-6">
    <div class="text-center mb-12">
        <div class="inline-block p-3 bg-orange-500/10 rounded-xl border border-orange-500/30 mb-4"><i class="fas fa-user-plus text-3xl text-orange-400"></i></div>
        <h2 class="text-4xl font-bold mb-4 text-white">Enregistrer un <span class="text-orange-400">Nouveau Colis Client</span></h2>
        <p class="text-gray-400 text-lg">Enregistrez les informations du client et de ses colis pour un envoi</p>
    </div>
    <div class="max-w-3xl mx-auto bg-gray-800 rounded-3xl p-8 border border-orange-500/20 hover:border-orange-400 transition-colors duration-300">
        <form id="register-package-form" class="space-y-8">
            <!-- Informations Client -->
            <div>
                <h3 class="text-xl font-bold text-orange-400 mb-4"><i class="fas fa-user mr-2"></i> Informations du Client</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="client-nom" class="block text-gray-300 font-semibold mb-2">Nom</label>
                        <input type="text" id="client-nom" name="client-nom" placeholder="Nom du client" class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none" required>
                    </div>
                    <div>
                        <label for="client-prenom" class="block text-gray-300 font-semibold mb-2">Prénom</label>
                        <input type="text" id="client-prenom" name="client-prenom" placeholder="Prénom du client" class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none" required>
                    </div>
                    <div>
                        <label for="client-phone" class="block text-gray-300 font-semibold mb-2">Téléphone</label>
                        <input type="tel" id="client-phone" name="client-phone" placeholder="Ex: +33 6 12 34 56 78" class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none" required>
                    </div>
                    <div>
                        <label for="client-address" class="block text-gray-300 font-semibold mb-2">Adresse</label>
                        <input type="text" id="client-address" name="client-address" placeholder="Adresse complète" class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none" required>
                    </div>
                    <div class="md:col-span-2">
                        <label for="client-email" class="block text-gray-300 font-semibold mb-2">Email (Facultatif)</label>
                        <input type="email" id="client-email" name="client-email" placeholder="email@example.com" class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none">
                    </div>
                </div>
            </div>
            <!-- Informations Colis -->
            <div>
                <h3 class="text-xl font-bold text-orange-400 mb-4"><i class="fas fa-box-open mr-2"></i> Informations du Colis</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="package-count" class="block text-gray-300 font-semibold mb-2">Nombre de Colis</label>
                        <input type="number" id="package-count" name="package-count" placeholder="Ex: 1" min="1" class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none" required>
                    </div>
                    <div>
                        <label for="package-weight" class="block text-gray-300 font-semibold mb-2">Poids Total (kg)</label>
                        <input type="number" id="package-weight" name="package-weight" placeholder="Ex: 15" class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none" min="0.1" step="0.1" required>
                    </div>
                    <div>
                        <label for="package-product-type" class="block text-gray-300 font-semibold mb-2">Type de Produit</label>
                        <select id="package-product-type" name="package-product-type" class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-orange-400 focus:outline-none" required>
                            <option value="">Sélectionnez un type</option>
                            <option value="alimentaire">Alimentaire</option>
                            <option value="chimique">Chimique</option>
                            <option value="materiel-fragile">Matériel Fragile</option>
                            <option value="materiel-incassable">Matériel Incassable</option>
                        </select>
                    </div>
                    <div>
                        <label for="package-cargo-type" class="block text-gray-300 font-semibold mb-2">Type de Cargaison Souhaitée</label>
                        <select id="package-cargo-type" name="package-cargo-type" class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-orange-400 focus:outline-none" required>
                            <option value="">Sélectionnez un type</option>
                            <option value="maritime">Maritime</option>
                            <option value="aerienne">Aérienne</option>
                            <option value="routiere">Routière</option>
                        </select>
                    </div>
                    <div class="md:col-span-2">
                        <label for="recipient-email-sms" class="block text-gray-300 font-semibold mb-2">Email/SMS Destinataire</label>
                        <input type="text" id="recipient-email-sms" name="recipient-email-sms" placeholder="Email ou numéro de téléphone du destinataire" class="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-orange-400 focus:outline-none" required>
                    </div>
                </div>
                <div class="mt-6 p-4 bg-orange-900/30 rounded-lg border border-orange-500/30">
                    <p class="text-orange-300 font-semibold text-sm"><i class="fas fa-info-circle mr-2"></i> Le prix minimum pour chaque colis est de 10.000 F. Si le montant calculé est inférieur, il sera arrondi à 10.000 F.</p>
                </div>
            </div>
            <button type="submit" class="w-full py-4 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-semibold transition-colors duration-300 shadow-lg shadow-orange-500/25"><i class="fas fa-paper-plane mr-2"></i> Enregistrer Colis & Générer Reçu</button>
        </form>
    </div>
</div>
</section>
