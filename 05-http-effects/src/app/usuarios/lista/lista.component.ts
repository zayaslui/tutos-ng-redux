import { Component, OnInit } from '@angular/core';
import { map, mergeMap, tap } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from 'src/app/store/actions';
import { AppState } from 'src/app/store/app.reducers';
import { Store } from '@ngrx/store';
import { cargarUsuarios } from 'src/app/store/actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit{

  usuarios: Usuario[] = [];
  loading : boolean = false;
  error   : any;
  
  constructor(
              //public usuarioService: UsuarioService,
              private store: Store<AppState>,
              private actions$: Actions
            ){}

  ngOnInit(): void {
  /*
    this.usuarioService.getUsers()
    .pipe(map( (resp:any) => {
      return resp['data'];
    }))
    .subscribe( users => {
      console.log(users);
      this.usuarios = users;
    })
  */
   this.store.select('usuarios').subscribe( ({users, loading, error}) => {
    //console.log("users: ",users);
    this.usuarios = users;
    this.error    = error;
    this.loading  = loading;
   })
   this.store.dispatch(cargarUsuarios())
    
  }

  

}
