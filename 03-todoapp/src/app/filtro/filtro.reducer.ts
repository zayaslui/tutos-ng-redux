import { createReducer, on } from '@ngrx/store';
import { setFiltro } from './filtro.actions';

//export const initialState: filtrosValidos = 'todos';

export const initialState = 'todos';

export const filtroReducer = createReducer(
    initialState,
    on( setFiltro , (state, {filtro}) =>  filtro)
);