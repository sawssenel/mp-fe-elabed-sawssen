

import { Component, OnInit } from '@angular/core';
import { produit } from '../model/produit';
import { NgForm } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProduitsService } from '../services/produits.service';
import { Categorie } from '../model/Categorie';

@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  categories: Array<Categorie> = []; // Liste des catégories
  produits: produit[] = []; // Liste des produits
  produitCourant = new produit(); // Produit en cours d'édition
  categorieFiltre: number | undefined; // Catégorie sélectionnée pour le filtrage
  editMode: boolean = false; // Mode édition activé ou désactivé
  showForm: boolean = false; // Affichage du formulaire activé ou désactivé

  constructor(private produitsService: ProduitsService, private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    console.log("Initialisation du composant...");
    this.consulterProduits(); // Charger les produits au démarrage
    this.consulterCategories(); // Charger les catégories au démarrage
  }

  // Méthode appelée lors du changement de la catégorie de filtrage
  lancerRecherche() {
    this.rechercherParCategorie();
  }

  // Filtrer les produits par catégorie
  rechercherParCategorie() {
    if (this.categorieFiltre !== undefined) {
      // Appel au service pour récupérer les produits par catégorie
      this.produitsService.getProduitsParCategorie(this.categorieFiltre).subscribe({
        next: (produits: produit[]) => {
          this.produits = produits; // Mettre à jour la liste des produits filtrés
        },
        error: (err: any) => {
          console.error("Erreur lors de la récupération des produits par catégorie :", err);
        }
      });
    } else {
      this.consulterProduits(); // Si aucune catégorie sélectionnée, afficher tous les produits
    }
  }

  // Mettre à jour un produit existant
  mettreAJourProduit(nouveau: produit, ancien: produit) {
    this.produitsService.updateProduit(nouveau.id, nouveau).subscribe({
      next: updatedProduit => {
        console.log("Succès PUT");
        // Mettre à jour l'ancien produit avec les données mises à jour
        Object.assign(ancien, updatedProduit);
        console.log('Mise à jour du produit : ' + ancien.designation);
        this.annulerEdition(); // Réinitialiser le formulaire après la mise à jour
      },
      error: err => {
        console.error("Erreur PUT:", err);
      }
    });
  }

  // Supprimer un produit
  supprimerProduit(p: produit) {
    const confirmation = confirm("Voulez-vous supprimer le produit :"+p.designation+" ?");
    if (confirmation) {
      console.log("Suppression confirmée...");
      const index = this.produits.indexOf(p);
      if (index !== -1) {
        // Appel au service pour supprimer le produit
        this.produitsService.deleteProduit(p.id).subscribe({
          next: () => {
            console.log("Succès DELETE");
            this.produits.splice(index, 1); // Supprimer le produit de la liste affichée
            console.log("Suppression du produit:"+p.designation);
          },
          error: (err: any) => {
            console.error("Erreur DELETE", err);
          }
        });
      }
    } else {
      console.log("Suppression annulée...");
    }
  }

  // Valider le formulaire de produit
  validerFormulaire(produitForm: NgForm) {
    if (produitForm.value.id !== undefined) {
      console.log("ID non vide...");
      const existingProduct = this.produits.find(p => p.id === produitForm.value.id);
      if (existingProduct) {
        const confirmation = confirm("Produit existant. Confirmez-vous la mise à jour de : " + existingProduct.designation + "?");
        if (confirmation) {
          this.mettreAJourProduit(produitForm.value, existingProduct);
          this.showForm = false; // Fermer le formulaire après la validation
        } else {
          console.log("Mise à jour annulée");
        }
        return;
      }
    }
  }

  // Valider l'édition du produit
  validerEditionProduit() {
    // Vérifier si le formulaire est valide
    if (this.produitCourant && this.produitCourant.id) {
      // Appeler le service pour mettre à jour le produit
      this.produitsService.updateProduit(this.produitCourant.id, this.produitCourant).subscribe({
        next: updatedProduit => {
          console.log("Succès PUT");
          
          // Réinitialiser le formulaire et désactiver le mode édition
          this.annulerEdition();
        },
        error: err => {
          console.error("Erreur PUT:", err);
        }
      });
    } else {
      console.error("Impossible de valider l'édition du produit: ID non défini");
    }
  }

  // Activer le mode édition pour un produit
  editerProduit(produit: any) {
    this.produitCourant = produit;
    this.editMode = true;
    this.showForm = true;
  }

  // Annuler l'édition du produit
  annulerEdition() {
    this.editMode = false;
    this.produitCourant = new produit();
  }

  // Effacer les saisies du formulaire de produit
  effacerSaisie(produitForm: NgForm) {
    this.produitCourant = new produit();
    produitForm.resetForm();
  }

  // Charger tous les produits
  consulterProduits() {
    this.produitsService.getProduits().subscribe({
      next: (produits: produit[]) => {
        this.produits = produits; // Mettre à jour la liste des produits
      },
      error: (err: any) => {
        console.error("Erreur lors de la récupération des produits :", err);
      }
    });
  }

  // Charger toutes les catégories
  consulterCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (categories: Categorie[]) => {
        this.categories = categories; // Mettre à jour la liste des catégories
        console.log("Catégories récupérées avec succès:", categories);
      },
      error: (err: any) => {
        console.error("Erreur lors de la récupération des catégories :", err);
      }
    });
  }
}