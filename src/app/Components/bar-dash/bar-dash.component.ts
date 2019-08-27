import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-bar-dash',
  templateUrl: './bar-dash.component.html',
  styleUrls: ['./bar-dash.component.css']
})
export class BarDashComponent implements OnInit {

  private lab;
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
      backgroundColor: 'rgba(30, 169, 224, 0.8)'
    }
  ]
  chartOptions = {
    responsive: true,
    scales : {
      yAxes: [{
         ticks: {
            steps : 5,
            stepValue : 1,
            max : 5,
            min : 0
          }
      }] 
    }
  }
  constructor( private service:DashboardService ) { 

   

  }

  ngOnInit() {

   
    this.service.barData().subscribe((data:any)=>{

      console.log(data);
      this.lab = data.data.grp;
      this.incData = data.data.inc;
      this.labels = data.data.grp;
      console.log(this.labels);
      this.chartData = [
        {
          label: 'Incident',
          data: this.incData  
        }
      ]
      console.log(this.chartData);
      console.log(this.lab);
      console.log(this.incData);
     
    },(err:any)=>{

      console.log(err);

    })
    
  }

  onChartClick(event) {
    console.log(event);
  }

}
