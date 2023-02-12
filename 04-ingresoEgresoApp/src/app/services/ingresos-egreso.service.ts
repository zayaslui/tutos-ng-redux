import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';
import { doc, setDoc } from "firebase/firestore";
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresosEgresoService {

  constructor(
              private firestore: AngularFirestore,
              private authService : AuthService
            ) { }

  
  crearIngresoEgreso(ingresoEgreso : IngresoEgreso){

    //this.firestore.doc(`Nb9eEljsVlXLA0g5Sazzd3D9LC43/ingresos-egresos`).valueChanges()

    
    
    const uid = this.authService.user.uid as string;
    console.log(`${uid}/ingresos-egresos/items`)
    console.log("ingresoEgreso : ",ingresoEgreso)
    
    return this.firestore
          .collection(`${uid}/ingresos-egresos/items`)
          .add({...ingresoEgreso})
          //.then( (ref) => console.log('exito', ref))
          //.catch( err => console.warn(err))
    /*
    this.firestore.doc(`${uid}/ingresos-egresos`)
    .collection('items')
    .add({...ingresoEgreso})
    .then( (ref) => console.log('exito', ref))
    .catch( err => console.warn(err))
    */

  }

  initIngresosEgresosListener(uid :  string){
    return this.firestore.collection(`${uid}/ingresos-egresos/items`)
        .snapshotChanges()
        .pipe(
          map( snapshot => {
            //console.log(snapshot)
            return snapshot.map( doc => {
              //console.log(doc.payload.doc.data())
              const data: any = doc.payload.doc.data();
              return { 
                uid: doc.payload.doc.id,
                ...doc.payload.doc.data() as any
              }
            });
          })
        )
        //.subscribe( algo => {console.log(algo)})
  }

}
