import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inc-card',
  templateUrl: './inc-card.component.html',
  styleUrls: ['./inc-card.component.css']
})
export class IncCardComponent implements OnInit {

  private incSum:number;
  private ciNum:number;
  private chartData = [
    {
      label: 'Incident',
      data: []  
    }
  ];
  private incData;
  private labels;
  colors = [
    { 
      backgroundColor: 'rgb(255, 108, 2,0.8)'
    }
  ]
  chartOptions = {
    responsive: true,
    scales : {
      xAxes: [{
         ticks: {
            steps : 5,
            stepValue : 1,
            max : 5,
            min : 0
          }
      }] 
    }
  }

  constructor( private service:DashboardService, private routes:Router ) {

    this.incSum = 0;
    this.ciNum = 0;

   }

  ngOnInit() {

    this.service.incData().subscribe((data:any)=>{

      console.log(data);
      this.incData = data.data.inc;
      this.labels = data.data.ci;
      this.chartData = [
        {
          label: 'Incident',
          data: this.incData  
        }
      ]

      this.ciNum = this.labels.length;

      this.incData.forEach((cur)=>{
        console.log(cur);
        this.incSum += cur;
      })
      console.log(this.ciNum);
    },(err:any)=>{

      console.log(err);

    })

  }

  public createInc(per){

    if(per == 0){

      this.routes.navigate(['incident']);

    }else if(per == 1){

      this.routes.navigate(['incidentList']);

    } 
    
    console.log(per);

  }

}
