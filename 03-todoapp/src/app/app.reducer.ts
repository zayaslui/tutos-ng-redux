import { ActionReducerMap } from "@ngrx/store";
import { filtroReducer } from "./filtro/filtro.reducer";
import { Todo } from "./todos/models/todo.model";
import { todoReducer } from "./todos/todo.reducer";

export interface AppState{
    
    todos : Todo[],
    filtro : string
    
}


//agrupar todos los reducers
export const appReducer: ActionReducerMap<AppState> = {

    todos : todoReducer,
    filtro : filtroReducer

}