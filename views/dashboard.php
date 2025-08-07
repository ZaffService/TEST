<?php
session_start();

// Vérifier si l'utilisateur est connecté
if (!isset($_SESSION['user_logged_in']) || $_SESSION['user_logged_in'] !== true) {
    header('Location: /login');
    exit();
}

$username = $_SESSION['username'] ?? 'Utilisateur';
?>

<?php include __DIR__ . '/../templates/navigation.php'; ?>

<!-- Section: Dashboard Principal -->
<section id="dashboard-principal" class="py-16 bg-gray-800/30 pt-32">
    <div class="container mx-auto px-6">
        <!-- Header du Dashboard -->
        <div class="text-center mb-12">
            <div class="inline-block p-3 bg-cyan-500/10 rounded-xl border border-cyan-500/30 mb-4">
                <i class="fas fa-tachometer-alt text-3xl text-cyan-400"></i>
            </div>
            <h2 class="text-4xl font-bold mb-4 text-white">Tableau de <span class="text-cyan-400">Bord</span></h2>
            <p class="text-gray-400 text-lg">Bienvenue, <span class="text-cyan-400 font-semibold"><?php echo htmlspecialchars($username); ?></span></p>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div class="bg-gray-800 rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300">
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
            
            <div class="bg-gray-800 rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300">
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
            
            <div class="bg-gray-800 rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300">
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
            
            <div class="bg-gray-800 rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300">
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

        <!-- Actions Rapides -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <a href="/creation-cargaison" class="bg-gray-800 rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-400 transition-all duration-300 block">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                        <i class="fas fa-plus text-cyan-400 text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-white">Créer Cargaison</h3>
                        <p class="text-gray-400 text-sm">Nouvelle cargaison</p>
                    </div>
                </div>
            </a>

            <a href="/enregistrement-colis" class="bg-gray-800 rounded-2xl p-6 border border-orange-500/20 hover:border-orange-400 transition-all duration-300 block">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                        <i class="fas fa-box text-orange-400 text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-white">Enregistrer Colis</h3>
                        <p class="text-gray-400 text-sm">Nouveau colis client</p>
                    </div>
                </div>
            </a>

            <a href="/lister-cargaison" class="bg-gray-800 rounded-2xl p-6 border border-green-500/20 hover:border-green-400 transition-all duration-300 block">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                        <i class="fas fa-list text-green-400 text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-white">Lister Cargaisons</h3>
                        <p class="text-gray-400 text-sm">Voir toutes les cargaisons</p>
                    </div>
                </div>
            </a>

            <a href="/outils-gestionnaire" class="bg-gray-800 rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400 transition-all duration-300 block">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                        <i class="fas fa-tools text-purple-400 text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-white">Outils Gestionnaire</h3>
                        <p class="text-gray-400 text-sm">Recherche et gestion</p>
                    </div>
                </div>
            </a>

            <a href="/logout" class="bg-gray-800 rounded-2xl p-6 border border-red-500/20 hover:border-red-400 transition-all duration-300 block">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                        <i class="fas fa-sign-out-alt text-red-400 text-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-white">Déconnexion</h3>
                        <p class="text-gray-400 text-sm">Quitter la session</p>
                    </div>
                </div>
            </a>
        </div>
    </div>
</section>

<script>
// Charger les statistiques du dashboard
document.addEventListener('DOMContentLoaded', function() {
    updateDashboardCounts();
});
</script>