import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { v4 as uuidv4 } from 'uuid';
import { MiembrosInterface } from '../models/miembros.model';
import * as firebase from 'firebase/app';
import { ContentObserver } from '@angular/cdk/observers';
import { eventInterface } from '../models/event.model';


@Injectable({
  providedIn: 'root',
})
export class EventosService {
  constructor(private firestore: AngularFirestore) {}

  // Crear un nuevo evento
  createEvent(nombre, cupo, fecha: string, hora) {
    let result = '';

    for (let letter of fecha) {
      result += letter.replace('/', '');
    }
    let id = uuidv4();

    this.firestore.collection('eventos').doc(`${id}`).set({
      asistentes: [],
      hora: hora,
      capacidad: cupo,
      fecha: fecha,
      nombre: nombre,
      vencido: false,
      id:id
    });
  }

  // Consultar evento y traer asistentes
  searchAsistentes(id: string) {
    let query = this.firestore.collection('eventos');

    return query
      .doc(`${id}`)
      .ref.get()
      .then((evento) => {
        return evento.data();
      })
      .catch((err) => err);
  }

  // Consultar eventos disponibles
  searchEventos() {
    let eventos = this.firestore.collection('eventos');

    return eventos.ref
      .get()
      .then((evento) => {
        if(evento.empty){
          return false;
        }
        return evento.docs.map((result) => {
          if (result.exists) {
            return result.data();
          }
          return false;
        });
      })
      .catch((err) => console.log('error', err));
  }

  // Registrarme a un evento
  asistirEvento(id:string,asistente:MiembrosInterface,q1,q2,q3,t:number) {
    let data =
      {
        nombres: asistente.nombres,
        apellidos: asistente.apellidos,
        celular: asistente.celular,
        tipoDoc: asistente.tipoDoc,
        docID: asistente.docID,
        edad: asistente.edad,
        genero: asistente.genero,
        email: asistente.email,
        ministerio: asistente.ministerio,
        aceptotyc: asistente.aceptotyc,

        question1COVID: q1,
        question2COVID: q2,
        question3COVID: q3,
        temperatura: t,
      };
    this.firestore
      .collection('eventos')
      .doc(id)
      .update({
        asistentes: firebase.default.firestore.FieldValue.arrayUnion(data),
        inscritos: firebase.default.firestore.FieldValue.increment(1)
      });

  }

  //Consultar si esta registrado 
  isRegister(e,asistente:MiembrosInterface) {
    return this.firestore
    .collection('eventos')
    .doc(`${e.id}`)
    .ref.get()
    .then(res => {
      let data:eventInterface = res.data();
      return data.asistentes.find(x=>{
        if(x.docID === asistente.docID){
          return x.docID;
        }
        else{
          return false;
        }
    })
    });    
  }
  //eliminareventos
  deleteEvent(id:string){
    
    let eventos = this.firestore.collection('eventos');
    return eventos
      .doc(`${id}`)
      .delete().then(()=> 
      console.log('borrando evento,',`${id}`)
      ).catch((err)=>console.log(err));
  }

}
