export class Router {
    private routes: Map<string, () => void> = new Map();
    private currentPath: string = '';

    addRoute(path: string, handler: () => void): void {
        this.routes.set(path, handler);
    }

    navigate(path: string): void {
        if (this.currentPath === path) return;
        
        this.currentPath = path;
        window.history.pushState({}, '', path);
        this.handleRoute(path);
    }

    private handleRoute(path: string): void {
        const handler = this.routes.get(path) || this.routes.get('/');
        if (handler) {
            handler();
        }
    }

    start(): void {
        // Gérer le bouton retour du navigateur
        window.addEventListener('popstate', () => {
            this.handleRoute(window.location.pathname);
        });

        // Gérer la route initiale
        const initialPath = window.location.pathname === '/' ? '/dashboard' : window.location.pathname;
        this.navigate(initialPath);
    }
}