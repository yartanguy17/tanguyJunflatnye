import { BiensService } from './../services/biens.service';
import { Biens } from './../models/biens';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompteService } from '../services/compte.service';

@Component({
  selector: 'app-ajouter-etablissement',
  templateUrl: './ajouter-etablissement.component.html',
  styleUrls: ['./ajouter-etablissement.component.css']
})
export class AjouterEtablissementComponent implements OnInit {

  medias: FormGroup;
  biens: FormGroup;
  selectedFile: File;
  submitted = false;
  bien: Biens;
  tableauCompte: [];
  tableauNomCompte;

  constructor(private bienS: BiensService, private compteS: CompteService, private fb: FormBuilder) {
    this.getCompte();
  }

  ngOnInit(): void {
    this.controle();
    this.controleBien();
    this.sendMedias();
    this.sendBien();
  }

  controleBien(){
    this.biens = this.fb.group({
      titre: [ '' , Validators.required],
      coordonnee: [ '' , Validators.required],
      ville : [ '' , Validators.required],
      quartier: [ '' , Validators.required],
      liaison : [ '' , Validators.required],
      dimension: [ '' , Validators.required],
      description : [ '' , Validators.required],
      prix : [ '' , Validators.required],
      type : [ '' , Validators.required],
      categorie : [ '' , Validators.required],
      agence : [ '' , Validators.required]
    });
  }
  controle(){
    this.medias = this.fb.group({
      titre: [ '' , Validators.required],
      type: [ '' , Validators.required],
      liaison : [ '' , Validators.required]
    });
  }

  get fc() {
    return this.medias.controls;
  }
  processFile(imageInput: any){
    this.selectedFile = imageInput.files[0];
    console.log('Les infos avant', this.selectedFile);
  }

  sendMedias(){
    this.submitted = true;
    const titre = this.medias.get('titre').value;
    const type = this.medias.get('type').value;
    const liaison = this.medias.get('liaison').value;
    console.log('Les infos aprés', this.selectedFile);
  }
  sendBien(){
    const titre = this.biens.get('titre').value;
    const coordonnee = this.biens.get('coordonnee').value;
    const ville = this.biens.get('ville').value;
    const quartier = this.biens.get('quartier').value;
    const dimension = this.biens.get('dimension').value;
    const description = this.biens.get('description').value;
    const prix = this.biens.get('prix').value;
    const type = this.biens.get('type').value;
    const categorie = this.biens.get('categorie').value;
    const agence = this.biens.get('agence').value;
    const etat=null;
    const estvalide=true;
    console.log(titre , coordonnee , ville , quartier , dimension , description , prix , type , categorie ,etat,estvalide, agence);

    const bien = new Biens(titre, coordonnee, ville, quartier, dimension, description, prix, type, categorie, etat,estvalide,agence);

    this.bienS.createBien(bien).then((res)=>{
      console.log('Bien enrégistré avec succe',res)
  }, (err)=>{
    console.log('Enregistrement erroné',err)
  });



  }

  getCompte(){
    this.compteS.getAllcompte().subscribe( res => {
      console.log('compte :', res);
      this.tableauCompte = Object.values(res)[3];
      console.log('compte tableau:', this.tableauCompte);
      for (res in this.tableauCompte){
          this.tableauNomCompte = this.tableauCompte[res];
          console.log('compte tableau for:', this.tableauNomCompte.nom);
      }
    });
  }
}
