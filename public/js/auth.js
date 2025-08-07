"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthManager = void 0;
// Gestion de l'authentification côté client
class AuthManager {
    constructor() { }
    static getInstance() {
        if (!AuthManager.instance) {
            AuthManager.instance = new AuthManager();
        }
        return AuthManager.instance;
    }
    // Vérifier si l'utilisateur est connecté (côté client)
    isLoggedIn() {
        // Cette vérification se fait côté serveur avec PHP sessions
        // Côté client, on peut vérifier la présence d'éléments spécifiques
        return document.querySelector('[data-user-logged]') !== null;
    }
    // Rediriger vers la page de connexion
    redirectToLogin() {
        window.location.href = '/login';
    }
    // Déconnexion
    logout() {
        if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
            window.location.href = '/logout';
        }
    }
    // Vérifier les permissions pour certaines actions
    checkPermissions(action) {
        // Ici vous pouvez implémenter une logique de permissions
        // Pour l'instant, tous les utilisateurs connectés ont les mêmes droits
        return this.isLoggedIn();
    }
}
exports.AuthManager = AuthManager;
// Initialisation globale
document.addEventListener('DOMContentLoaded', () => {
    const auth = AuthManager.getInstance();
    // Ajouter des écouteurs pour les boutons de déconnexion
    const logoutButtons = document.querySelectorAll('[data-logout]');
    logoutButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            auth.logout();
        });
    });
});
