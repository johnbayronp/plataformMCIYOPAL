import { Injectable } from '@angular/core';
import { MiembrosInterface } from '../models/miembros.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MiembrosmciService {
  user: MiembrosInterface;

  constructor(private firestore: AngularFirestore) {}

  // Crear un nuevo miembro
  createNewMember(miembro: MiembrosInterface) {
    this.firestore.collection('miembros').doc(`${miembro.docID}`).set(miembro);

  }

  // Consultar si el miembro esta registrado
  verifyID(documento: string) {
    const docRef = this.firestore.collection('miembros').doc(documento);

    return docRef.ref.get()
    .then((usuario) => {
      if(usuario.exists){
        return usuario.data();
      }else {
        return false;
      }
    })
    .catch((err)=>console.log('error',err));
  
  }

  // Consultar el miembro para validar el registro

  // Consultar todos los miembros
  allMembers(){

    const docRef = this.firestore.collection('miembros');

    return docRef.ref
    .get()
    .then((data) => 
      data.docs.map(res=>res.data())
    )
    .catch((err)=>console.log('error',err));
  }

  // Consultar miembros por lider

  // Eliminar un miembro
}
