import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { produit } from '../model/produit'; 
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProduitsService {
// Url du service web de gestion de produits 
// commune pour toutes les méthodes 

urlHote="http://localhost:3333/produits/";
  apiUrl: any;

  constructor(private http :HttpClient) 
  { }
  getProduits() :Observable<Array<produit>>
  {
     return this.http.get<Array<produit>> (this.urlHote);
  }
  deleteProduit(idP: number|undefined)
  {
    
    return this.http.delete (this.urlHote+idP);
  }
  addProduit(nouveau: produit)
  {
    return this.http.post<Array<produit>> (this.urlHote,nouveau);
  }
  updateProduit(idP: number | undefined, nouveau: produit)
  {
    return this.http.put(this.urlHote+idP,nouveau);
  }
  // Méthode pour récupérer la liste des produits d'une catégorie spécifique
  getProduitsParCategorie(categorieId: number): Observable<produit[]> {
    return this.http.get<produit[]>(`${this.urlHote}par-categorie/${categorieId}`);
  }
}
