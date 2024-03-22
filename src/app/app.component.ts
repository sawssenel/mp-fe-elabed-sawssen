import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  actions:Array<any> =
  [
    { titre:"Accuiel", route:"/accueil"},
    { titre:"Liste des produits", route:"/produits"},
    { titre:"Ajouter Produit", route:"/ajouterProduit"},
    { titre: "Ajouter Catégorie", route: "/ajouterCategorie", icone: 'bi bi-plus-square-fill' }

  ]
  actionCourante:any;

setActionCourante(a :any)
{
  this.actionCourante=a;
}
  title = 'ng-gestion-produits';
}
