import { Categorie } from './Categorie';

export class produit {
    id:number | undefined;
    code:string | undefined;
    designation:string | undefined;
    prix:number | undefined;
    categorie: Categorie | undefined;
}