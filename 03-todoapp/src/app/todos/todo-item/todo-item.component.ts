import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Todo } from '../models/todo.model';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {

  @Input() todo : Todo;
  @ViewChild('inputFisico') txtInputFisico : ElementRef | undefined;

  chkCompletado : FormControl;
  txtInput      : FormControl;
  editando      : boolean;

  constructor(private store: Store<AppState>){
    this.todo             = new Todo('');
    this.chkCompletado    = new FormControl();
    this.txtInput         = new FormControl();
    this.editando         = false;
  }

  ngOnInit():void{
    
    this.chkCompletado    = new FormControl( this.todo.completado );
    this.txtInput         = new FormControl( this.todo.texto, Validators.required );

    this.chkCompletado.valueChanges.subscribe( valor => {
      console.log("CAMBIA EL VALOR DEL TOGGLE EN: ",valor);
      this.store.dispatch( actions.toggle({ id: this.todo.id }));
    });

  }
  editar(){
    this.editando = true; 
    this.txtInput.setValue(this.todo.texto);
    setTimeout(() => {
      //this.txtInputFisico?.nativeElement.focus();
      this.txtInputFisico?.nativeElement.select();
    }, 1);
  }
  terminarEdicion(){

    this.editando = false;
    
    
    if(this.txtInput.invalid){return;}
    if(this.txtInput.value === this.todo.texto){return;}
    this.store.dispatch(
      actions.editar({
        id    : this.todo.id,
        texto : this.txtInput.value
      })
    );
  }

  borrar(){
    this.store.dispatch(
      actions.borrar({
        id    : this.todo.id
      })
    );
  }

}
