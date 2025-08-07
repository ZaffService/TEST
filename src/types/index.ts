export type CargoType = 'maritime' | 'aerienne' | 'routiere';
export type ProductType = 'alimentaire' | 'chimique' | 'materiel-fragile' | 'materiel-incassable';
export type CargoStatus = 'en-attente' | 'en-cours' | 'arrive' | 'recupere' | 'perdu' | 'archive';
export type GlobalStatus = 'ouvert' | 'ferme';

export interface Product {
    libelle: string;
    poids: number;
    type: ProductType;
    degreToxicite?: string;
}

export interface Cargo {
    id: string;
    numero: string;
    poidsMax: number;
    lieuDepart: string;
    lieuArrivee: string;
    distanceKm: number;
    type: CargoType;
    etatAvancement: CargoStatus;
    etatGlobale: GlobalStatus;
    produits: Product[];
    prixTotal: number;
}

export interface Client {
    nom: string;
    prenom: string;
    phone: string;
    address: string;
    email?: string;
}

export interface PackageInfo {
    count: number;
    weight: number;
    productType: ProductType;
    cargoType: CargoType;
    recipientContact: string;
}

export interface Package {
    id: string;
    code: string;
    status: CargoStatus;
    cargoId?: string;
    client: Client;
    packageInfo: PackageInfo;
}

export interface CargoStats {
    enAttente: number;
    enCours: number;
    arrive: number;
    problemes: number;
}