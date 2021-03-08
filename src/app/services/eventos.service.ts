import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { v4 as uuidv4 } from 'uuid';

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

    this.firestore.collection('eventos').doc().set({
      asistentes: [],
      hora: hora,
      capacidad: cupo,
      fecha: fecha,
      nombre: nombre,
      vencido: false,
      id: uuidv4(),
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
  asistirEvento(id) {
    this.firestore
      .collection('eventos')
      .doc(id)
      .set({
        asistentes: [
          {
            nombres: 'Jhon bayron',
            apellidos: 'Perez Suarez',
            celular: '318482845',
            tipoDoc: 'CC',
            docID: '1102874619',
            edad: '24',
            genero: 'Hombre',
            email: 'bayronperezs@outlook.es',
            ministerio: 'Camilo&Paula',
            aceptotyc: true,

            question1COVID: true,
            question2COVID: false,
            question3COVID: true,
          },
          {
            nombres: 'Johan',
            apellidos: 'Centeno',
            celular: '318482845',
            tipoDoc: 'CC',
            docID: '12345678',
            edad: '31',
            genero: 'Hombre',
            email: 'correo@outlook.es',
            ministerio: 'Camilo&Paula',
            aceptotyc: true,

            question1COVID: false,
            question2COVID: false,
            question3COVID: false,
          },
        ],
      });
    console.log('inscrito');
  }
}
