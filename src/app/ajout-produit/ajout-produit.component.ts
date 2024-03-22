import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { produit } from '../model/produit';
import { ProduitsService } from '../services/produits.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Categorie } from '../model/Categorie';

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})

export class AjoutProduitComponent implements OnInit {
  nouveauProduit: produit = new produit();
  categories: Categorie[] = [];

  constructor(private produitsService: ProduitsService, private categoriesService : CategoriesService) { }

  ngOnInit(): void {
    this.produitsService.getProduits().subscribe(
      data => {
        console.log("Produits existants", data);
      },
      error => {
        console.error("Erreur lors de la récupération des produits existants", error);
      }
    );
    this.categoriesService.getCategories().subscribe(
      data => {
        this.categories = data;
      },
      error => {
        console.error("Erreur lors de la récupération des catégories", error);
      }
    );
  }

  validerFormulaire(form: NgForm) {
    if (form.value.id !== undefined) {
      alert("Identificateur de produit déjà existant..");
    } else {
      this.ajouterProduit();
      form.resetForm();
    }
  }

  ajouterProduit() {
    this.produitsService.addProduit(this.nouveauProduit).subscribe(
      addedProduct => {
        console.log("Nouveau produit ajouté", addedProduct);
      },
      error => {
        console.error("Erreur lors de l'ajout d'un nouveau produit", error);
      }
    );
  }
  
  effacerSaisie() {
    this.nouveauProduit = new produit();
  }
}



