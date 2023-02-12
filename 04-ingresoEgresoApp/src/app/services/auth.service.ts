import { Injectable } from '@angular/core';
import { Auth ,createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { from, map, observable, Observable, of, Subject, Subscription, tap } from 'rxjs';

import firebase from 'firebase/compat/app';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../models/usuario.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedIn$ = new Subject<boolean>();
  authenticated: boolean;
  userSubscripcion : Subscription;
  private user_ : Usuario | null;

  get user(){
    return {... this.user_}
  }

  constructor(
              public auth: Auth, 
              private store : Store<AppState>,
              private db : AngularFirestore
            ) { 
    this.authenticated      = false;
    this.userSubscripcion   = Subscription.EMPTY;
    this.user_              = new Usuario('','','');
  }

  //avisa cuando sucede un cambio con la autenticacion ver si tiene permiso a una ruta
  initAuthListener(){
    
    //no hace falta destruir este observable solo se instancia una vez
    this.auth.onAuthStateChanged( user => {
      //console.log("user.email : ",user?.email);
      //console.log("user.uid   : ",user?.uid);
      if(user){
        this.authenticated = !!user;
        //console.log('authenticated: ',this.authenticated);
        //const temp = new Usuario('asdf','asdf','asdfasdfasdf@gmail.com')
        //this.store.dispatch(authActions.setUser({user: temp}))
        //this.db.collection('usuario').valueChanges().subscribe( (res) => {console.log(res)});
        this.userLoggedIn$.next(this.authenticated);
        //this.db.collection(`${user.uid}`).doc("usuario").valueChanges()
        this.userSubscripcion = this.db.doc(`${user.uid}/usuario`).valueChanges()
        .subscribe((firestoreUser) => {
          console.log("firestoreUser : ",{firestoreUser});
          //const user = new Usuario('asdf','asdf','ejemplo@gmail.com')
          const user = Usuario.fromFirebase(firestoreUser)
          this.user_ = user;
          this.store.dispatch(authActions.setUser({user}))
        })
        /*
        */
        }else{
          this.userSubscripcion.unsubscribe();
          this.store.dispatch(authActions.unSetUser())
          //console.log('Llamar el unset del user');
          this.user_ = null;
      }
      

    });
  }

  crearUsuario(nombre:string, email:string, password:string){
   console.log(nombre,email,password) 
   return createUserWithEmailAndPassword(this.auth,email,password)
  }

  loginUsuario(email: string, password:string){
    return signInWithEmailAndPassword(this.auth,email,password);
  }

  logout(){
    return this.auth.signOut();
  }
  //un quilombo para transformar a un observable
  isAuth():Observable<boolean>{
    return this.userLoggedIn$
      .pipe(
        //tap(user => console.log("tap:", user)),
        map(user => {
          //console.log("map : ",user);
          return user != false;
        }),
        //tap(user => console.log("tap:", user)),
      )
  }

}
