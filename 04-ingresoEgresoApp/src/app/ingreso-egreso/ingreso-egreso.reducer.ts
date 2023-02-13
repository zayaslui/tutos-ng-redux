import { createReducer, on } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { setItems, unSetItems } from './ingreso-egreso.actions';


export interface State {
    items: IngresoEgreso[]; 
}

export interface AppStateWithIngreso extends AppState{
    ingresosEgresos : State
}

export const initialState: State = {
   items: [],
}

export const IngresoEgresoReducer = createReducer(initialState,

    on(setItems, (state, { items }) => ({ ...state, items : [...items]  })),
    on(unSetItems, (state) => ({ ...state, items : []}))

);
