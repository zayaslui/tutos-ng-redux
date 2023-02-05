import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';

import { AppState } from 'src/app/app.reducer';

import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  todos : Todo[];
  filtroActual : string;

  constructor(private store:  Store<AppState>){
    this.todos = [];
    this.filtroActual = 'todos';
  }

  ngOnInit():void{

    //tomamos el nodo todos y cargamos la lista
    /*
    this.store.select('todos')
    .pipe(tap(res => console.log("LISTA",res)))
    .subscribe((todos) => {
      this.todos = todos;
      //console.log("subcribe") 
    })
    */
    this.store.subscribe( ({todos, filtro}) => {
      this.todos        = todos;
      this.filtroActual = filtro;
    })
  }

}
