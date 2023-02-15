import { Injectable } from "@angular/core";
import { Component, OnInit } from '@angular/core';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as usuariosActions from 'src/app/store/actions';
import { cargarUsuariosSuccess } from "src/app/store/actions";

@Injectable()
export class UsuariosEffects {
    
    constructor(
        public usuarioService: UsuarioService,
        private actions$: Actions
      ){}

    cargarUsuarios$ = createEffect(
        () => this.actions$
              .pipe(
                  ofType(usuariosActions.cargarUsuarios),
                  tap(data => console.log("effect tap: ",data)),
                  mergeMap(
                    () => this.usuarioService.getUsers()
                            .pipe(
                                //map( users  => users['data']), //obtener solo los usuarios
                                tap( data   => console.log( 'getUsers effects: ', data )),
                                map( users  => usuariosActions.cargarUsuariosSuccess({ usuarios : users['data'] })),
                                catchError((err) => of(usuariosActions.cargarUsuariosError({payload: err }))),

                            )
                  )
                )
    );
}