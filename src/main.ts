import { CargoManager } from './managers/CargoManager';
import { PackageManager } from './managers/PackageManager';
import { UIManager } from './managers/UIManager';
import { Router } from './utils/Router';

class App {
    private cargoManager: CargoManager;
    private packageManager: PackageManager;
    private uiManager: UIManager;
    private router: Router;

    constructor() {
        this.cargoManager = new CargoManager();
        this.packageManager = new PackageManager();
        this.uiManager = new UIManager();
        this.router = new Router();
        
        this.init();
    }

    private init(): void {
        this.setupRoutes();
        this.setupNavigation();
        this.router.start();
    }

    private setupRoutes(): void {
        this.router.addRoute('/', () => this.showDashboard());
        this.router.addRoute('/dashboard', () => this.showDashboard());
        this.router.addRoute('/create-cargo', () => this.showCreateCargo());
        this.router.addRoute('/register-package', () => this.showRegisterPackage());
        this.router.addRoute('/list-cargo', () => this.showListCargo());
        this.router.addRoute('/tools', () => this.showTools());
        this.router.addRoute('/tracking', () => this.showTracking());
    }

    private setupNavigation(): void {
        document.getElementById('nav-dashboard')?.addEventListener('click', () => {
            this.router.navigate('/dashboard');
        });
        
        document.getElementById('nav-create-cargo')?.addEventListener('click', () => {
            this.router.navigate('/create-cargo');
        });
        
        document.getElementById('nav-register-package')?.addEventListener('click', () => {
            this.router.navigate('/register-package');
        });
        
        document.getElementById('nav-list-cargo')?.addEventListener('click', () => {
            this.router.navigate('/list-cargo');
        });
        
        document.getElementById('nav-tools')?.addEventListener('click', () => {
            this.router.navigate('/tools');
        });
    }

    private async showDashboard(): Promise<void> {
        const stats = await this.cargoManager.getStats();
        this.uiManager.renderDashboard(stats);
    }

    private showCreateCargo(): void {
        this.uiManager.renderCreateCargo((cargoData) => {
            this.cargoManager.createCargo(cargoData);
        });
    }

    private showRegisterPackage(): void {
        this.uiManager.renderRegisterPackage((packageData) => {
            this.packageManager.registerPackage(packageData);
        });
    }

    private async showListCargo(): Promise<void> {
        const cargos = await this.cargoManager.getAllCargos();
        this.uiManager.renderListCargo(cargos);
    }

    private showTools(): void {
        this.uiManager.renderTools(
            (code) => this.packageManager.searchPackage(code),
            (number) => this.cargoManager.searchCargo(number)
        );
    }

    private showTracking(): void {
        this.uiManager.renderTracking((code) => {
            return this.packageManager.trackPackage(code);
        });
    }
}

// Initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
    new App();
});