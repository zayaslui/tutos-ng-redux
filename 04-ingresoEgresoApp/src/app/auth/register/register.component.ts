import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

import { Subscription, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy{

  registroForm : FormGroup;
  cargando  : boolean;
  uiSubscription: Subscription;

  constructor( 
              private fb          : FormBuilder, 
              private authService : AuthService,
              private router      : Router,
              private store       : Store<AppState>
            ){

    this.registroForm = new FormGroup('')
    this.uiSubscription = Subscription.EMPTY;
    this.cargando = false;
  }

  ngOnInit():void{
    this.registroForm = this.fb.group({
      nombre    : ['', Validators.required],
      email     : ['', Validators.required],
      password  : ['', Validators.required]
    })
    this.uiSubscription = this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading;
    });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  crearUsuario(){
    
    if(this.registroForm.invalid){return;} 
    const {nombre, email, password} = this.registroForm.value;
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

    this.authService.crearUsuario(nombre, email, password)
      .then(credenciales => {
        console.log(credenciales);
        //cerrar el loading
        //Swal.close();
        //cerrar el loading
        this.router.navigate(['/'])
      })
      .catch(err => {
        this.store.dispatch(ui.isLoading())        
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
          footer: '<a href="">Why do I have this issue?</a>'
        })
        /*
        */
      })
    
    /*
    console.log(this.registroForm);
    console.log(this.registroForm.valid);
    console.log(this.registroForm.value);
    */
  }

}
