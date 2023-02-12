import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';

import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{

  loginForm : FormGroup;
  cargando  : boolean;
  uiSubscription: Subscription;

  constructor(
    private fb          : FormBuilder, 
    private authService : AuthService,
    private router      : Router,
    private store       : Store<AppState>
  ){
    this.loginForm = this.fb.group({
      email         : ['', Validators.required],
      password      : ['', Validators.required]
    })
    this.cargando = false;
    this.uiSubscription = Subscription.EMPTY;
  }

  ngOnInit():void{
    this.uiSubscription = this.store.select('ui').subscribe( ui => {
                            this.cargando = ui.isLoading;
                            console.log("cargando: ",this.cargando);
                          });
  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  login(){
    if(this.loginForm.invalid){return;}

    this.store.dispatch(ui.isLoading())

    const {email, password} = this.loginForm.value
    
    //disparar el loading
    /*
    Swal.fire({
      title: 'Auto close alert!',
      html: 'I will close in <b></b> milliseconds.',
      didOpen: () => {
        Swal.showLoading()
      }
    })
    */

    //disparar el loading
    //this.authService.loginUsuario(email, password)
    this.authService.loginUsuario('lzayas@gmail.com', '123456')
    .then(credenciales => {
      //console.log("credenciales: ", credenciales);
      this.store.dispatch( ui.stopLoading() );
    })
    .catch(err => {
      this.store.dispatch(ui.isLoading())
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
        footer: '<a href="">Why do I have this issue?</a>'
      })
    })
    //mude aca porque dentro del promise no funciona
    this.router.navigate(['/'])

  }


}
