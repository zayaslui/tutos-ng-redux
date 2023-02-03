import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as actions from '../contador.actions';

@Component({
  selector: 'app-nieto',
  templateUrl: './nieto.component.html',
  styleUrls: ['./nieto.component.css']
})
export class NietoComponent {

  contador:number = 0;

  constructor(private store : Store<AppState>){

  }

  ngOnInit(): void {
    this.store.select('contador')
    .subscribe( contador => this.contador = contador)
  }


  //@Input() contador: number = 0; 
  //@Output() resetContador = new EventEmitter<number>();

  reset(){
    //console.log("reset!!!")
    //this.contador = 0;
    //this.resetContador.emit(this.contador);

    this.store.dispatch(actions.reset())
  }
}
