import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from 'src/app/filtro/filtro.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent {

  filtroActual : string = 'todos'; //reemplazar por filtroValidos

  filtros: string[] = ['todos','completados', 'pendientes']

  pendientes : number;

  constructor(private store : Store<AppState>){
    this.pendientes = 0;
  }

  ngOnInit():void{
    //this.store.select('filtro')
      //.subscribe( filtro => this.filtroActual = filtro)

    this.store.subscribe(
      state => {
        this.filtroActual  = state.filtro;
        this.pendientes    = state.todos.filter( todo => !todo.completado).length
      }
    )
  }

  cambiarFiltro(filtro : string){
    console.log(filtro)
    this.store.dispatch(actions.setFiltro({filtro}))
  }

}
