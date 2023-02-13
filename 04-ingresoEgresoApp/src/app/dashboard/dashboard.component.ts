import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import  * as ingresosEgresosActions  from '../ingreso-egreso/ingreso-egreso.actions';

import { IngresosEgresoService } from '../services/ingresos-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{
  
  userSubs          : Subscription;
  ingresoEgresoSubs : Subscription;

  constructor(
      private store : Store<AppState>,
      private ingresoEgresoService : IngresosEgresoService
  ){
    this.userSubs           = Subscription.EMPTY;
    this.ingresoEgresoSubs  = Subscription.EMPTY;
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
    this.ingresoEgresoSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
      .pipe(
        filter( auth => auth.user!=null)
      )
      .subscribe( ({user}) => {
        //console.log({user});
        if(user)
          this.ingresoEgresoSubs = this.ingresoEgresoService.initIngresosEgresosListener(user.uid)
              .subscribe( ingresosEgresosFB => {
                //console.log("ingresosEgresosFB: ",ingresosEgresosFB);
                this.store.dispatch(ingresosEgresosActions.setItems({items : ingresosEgresosFB}));
              });
      })
  }
  
}
