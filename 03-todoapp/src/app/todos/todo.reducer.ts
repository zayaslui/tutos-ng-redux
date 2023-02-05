import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { borrar, crear, editar, limpiarCompletados, toggle, toggleAll } from './todo.actions';


export const estadoInicial : Todo[] = [
    new Todo('first todo...'),
    new Todo('second todo...'),
    new Todo('third todo...'),
    new Todo('fourth todo...'),
    new Todo('fifth todo...'),
    
];

export const todoReducer = createReducer(
  estadoInicial,
  on(crear, (state, {texto}) => [ ...state, new Todo(texto)]),
  on(borrar, (state, {id}) => state.filter( todo => todo.id!==id)),
  on(limpiarCompletados, state => state.filter(todo => !todo.completado)),
  on(toggleAll, (state, {completado}) => {
    console.warn("EJECUTANDO LA ACCION TOGGLE_ALL: ",completado);
    return state.map( todo => {
      return {
        ...todo,
        completado : completado
      }
    });
  }),
  on(toggle, (state, { id }) => {
    console.warn("EJECUTANDO LA ACCION TOGGLE : ",id);
    return state.map( (todo:Todo) => {
      /*
      console.log({
        ...todo,
        completado: todo.completado        
      })
      */
      if(todo.id===id){
        //la regla es enviar un nuevo objeto y no mutar el actual
        //todo.completado = !todo.completado
        return {
          ...todo,
          completado: !todo.completado
        }
      }else{
        return todo;
      }
    });
  }),
  on(editar, (state, { id, texto }) => {
    console.warn("EJECUTANDO LA ACCION EDITAR: ",id, texto);
    return state.map( todo => {
      if(todo.id==id){
        //la regla es enviar un nuevo objeto  y no mutar el actual 
        return {
          ...todo,
          texto: texto
        }
      }
      return todo;
    })
  }),

);

