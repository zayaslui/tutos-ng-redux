import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducers';
//import { decrementar, incrementar } from './contador/contador.actions';
import * as actions from './contador/contador.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'redux-app';
  contador : number = 0;

  constructor( private store : Store<AppState> ){
    this.store
      .select( 'contador' )
      .subscribe( contador => this.contador = contador )
  }

  incrementar(){
    //this.contador +=1;
    this.store.dispatch( actions.incrementar() )
  }

  decrementar(){
    //this.contador -=1; 
    this.store.dispatch( actions.decrementar() )
  }

}
