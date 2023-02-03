import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as actions from '../contador.actions';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styleUrls: ['./hijo.component.css']
})
export class HijoComponent {
  
  
  constructor(private store : Store<AppState>){
    
  }
  
  ngOnInit(): void {
    this.store.select('contador')
    .subscribe( contador => this.contador = contador)
  }
  
  contador:number = 0;
  
  //@Input() contador : number = 0;
  //@Output() cambioContador = new EventEmitter<number>();


  multiplicar(){
    //this.contador *= 2;
    //this.cambioContador.emit(this.contador);
    this.store.dispatch(actions.multiplicar({numero : 2}))
  }

  dividir(){
    //this.contador /= 2;
    //this.cambioContador.emit(this.contador);
    this.store.dispatch(actions.dividir({numero : 2}))
  }

  resetNieto(nuevoContador: number){
    //this.contador = nuevoContador;
    //this.cambioContador.emit(this.contador)
    //this.store.dispatch(actions.reset())
  }


}
