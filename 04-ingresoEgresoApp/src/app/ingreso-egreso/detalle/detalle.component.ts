import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresosEgresoService } from 'src/app/services/ingresos-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresos: IngresoEgreso[];
  ingresosEgresosSub : Subscription;

  constructor(
              private store                 : Store<AppStateWithIngreso>,
              private ingresoEgresoService  : IngresosEgresoService){
    this.ingresosEgresos = [];
    this.ingresosEgresosSub  = Subscription.EMPTY;
  }
  ngOnDestroy(): void {
    this.ingresosEgresosSub.unsubscribe();
  }
  ngOnInit(): void {
    this.ingresosEgresosSub = this.store.select('ingresosEgresos')
    .pipe(

    )
    .subscribe( ({items}) =>{
      console.log(items)
      this.ingresosEgresos = items;
    })
  }

  borrar({uid} : any){
    if(uid){
      this.ingresoEgresoService.borrarIngresoEgreso(uid)
        .then( () => {
          Swal.fire('Hey user!', 'Item borrado!', 'success');
        })
        .catch( err => Swal.fire('Hey user!', err.message, 'error'))
    }
  }
}
