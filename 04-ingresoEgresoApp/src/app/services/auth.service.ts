import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: Auth) { }

  crearUsuario(nombre:string, email:string, password:string){
   console.log(nombre,email,password) 
   return createUserWithEmailAndPassword(this.auth,email,password)
  }



}
