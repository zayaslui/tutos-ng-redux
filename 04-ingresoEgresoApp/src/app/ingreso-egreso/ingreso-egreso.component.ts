import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresosEgresoService } from '../services/ingresos-egreso.service';
import * as ui from 'src/app/shared/ui.actions';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css']
})
export class IngresoEgresoComponent implements OnInit, OnDestroy{

  ingresoForm : FormGroup;
  tipo        : string;
  cargando    : boolean;
  uiSubscription: Subscription;

  constructor( 
              private fb                    : FormBuilder, 
              private ingresoEgresoService  : IngresosEgresoService,
              private store                 : Store<AppState>
            ){
    this.tipo         = 'ingreso'
    this.cargando     = false;
    this.uiSubscription = Subscription.EMPTY;
    this.ingresoForm  = this.fb.group({
      descripcion   : ['', Validators.required],
      monto         : ['', Validators.required],      
    })
  }
  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  ngOnInit(){
    this.uiSubscription = this.store.select('ui').subscribe( ({isLoading}) => {this.cargando = isLoading;});
  }

  guardar(){
    this.store.dispatch(ui.isLoading());
    if(this.ingresoForm.invalid){return;}
    console.log(this.ingresoForm.value, this.tipo);


    const {descripcion, monto } = this.ingresoForm.value
    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);
    this.ingresoEgresoService
        .crearIngresoEgreso(ingresoEgreso)
        .then( (ref) => {
          //limpiar formulario
          this.store.dispatch(ui.stopLoading());
          this.ingresoForm.reset;
          Swal.fire('Hey user!', 'Success!', 'success');
        })
        .catch( err => {
          this.store.dispatch(ui.stopLoading());
          Swal.fire('Hey user!', 'Error :(', 'error');
        })
  }
}
