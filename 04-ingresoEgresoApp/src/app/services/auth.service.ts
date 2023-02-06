import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: Auth) { }

  //avisa cuando sucede un cambio con la autenticacion ver si tiene permiso a una ruta
  initAuthListener(){
    this.auth.onAuthStateChanged( user => {
      console.log(user?.email);
      console.log(user?.uid);
    })
  }

  crearUsuario(nombre:string, email:string, password:string){
   console.log(nombre,email,password) 
   return createUserWithEmailAndPassword(this.auth,email,password)
  }

  loginUsuario(email: string, password:string){
    return signInWithEmailAndPassword(this.auth,email,password)
  }

  logout(){
    return this.auth.signOut();
  }



}
