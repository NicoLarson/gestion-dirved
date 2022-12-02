export default class Convention {
  num_operation: string;
  resonsable: Object;
  nom_projet: string;
  date_debut: Date;
  date_fin: Date;
  montant: number;
  montant_encaisse: number;
  piece_jointes: Array<string>;
  categories: Array<string>;
  partenaires: Array<string>;
  commentaires: string;

  constructor(
    num_operation: string,
    resonsable: Object,
    nom_projet: string,
    date_debut: Date,
    date_fin: Date,
    montant: number,
    montant_encaisse: number,
    piece_jointes: Array<string>,
    categories: Array<string>,
    partenaires: Array<string>,
    commentaires: string
  ) {
    this.num_operation = num_operation;
    this.resonsable = resonsable;
    this.nom_projet = nom_projet;
    this.date_debut = date_debut;
    this.date_fin = date_fin;
    this.montant = montant;
    this.montant_encaisse = montant_encaisse;
    this.piece_jointes = piece_jointes;
    this.categories = categories;
    this.partenaires = partenaires;
    this.commentaires = commentaires;
  }
}
