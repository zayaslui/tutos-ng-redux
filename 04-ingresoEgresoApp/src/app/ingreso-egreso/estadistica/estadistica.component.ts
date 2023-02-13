import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined; 


  ingresos:number       = 0;
  egresos:number        = 0;

  totalIngresos:number  = 0;
  totalEgresos:number   = 0;

  public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos' ];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {data: []},
    ]
  };

  constructor(
      private store: Store<AppState>
  ){

  }


  ngOnInit(): void {
    this.store.select('ingresosEgresos')
      .subscribe(({items}) => this.generarEstadistica(items))
  }

  generarEstadistica( items: IngresoEgreso[]){
    
    this.ingresos       = 0;
    this.egresos        = 0;  
    this.totalIngresos  = 0;
    this.totalEgresos   = 0;

    for (const item of items) {
      if(item.tipo==='ingreso'){
        this.totalIngresos+=parseInt(item.monto);
        this.ingresos++;
      }else{
        this.totalEgresos+=parseInt(item.monto);
        this.egresos++;
      }
    }

    this.doughnutChartData.datasets = [{
      data : [ this.totalIngresos, this.totalEgresos] 
    }]

    // Actualizar el gráfico sin que sea necesario un socket (soluciona el problema de que no encuentra los labels)
    this.chart?.chart?.update();

  }
}
