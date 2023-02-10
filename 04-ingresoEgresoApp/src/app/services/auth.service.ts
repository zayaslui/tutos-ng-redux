import { Injectable } from '@angular/core';
import { Auth ,createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { from, map, observable, Observable, of, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userLoggedIn$ = new Subject<boolean>();
  authenticated: boolean;

  constructor(public auth: Auth, private router : Router) { 
    this.authenticated = false;
  }

  //avisa cuando sucede un cambio con la autenticacion ver si tiene permiso a una ruta
  initAuthListener(){
    
    this.auth.onAuthStateChanged( user => {
      console.log("user.email : ",user?.email);
      console.log("user.uid   : ",user?.uid);
      this.authenticated = !!user;
      console.log('authenticated: ',this.authenticated);
      this.userLoggedIn$.next(this.authenticated)
      if(user?.email!=null){
        this.router.navigate(['/'])
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
        tap(user => console.log("tap:", user)),
        map(user => {
          console.log("map : ",user);
          return user != false;
        }),
        tap(user => console.log("tap:", user)),
      )
  }

}
