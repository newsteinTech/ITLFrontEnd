import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/Services/dashboard.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  private newState;
  private inProgress;
  private OnHold; 
  private Resolved;
  private Cancelled;

  public pieChartData:number[];
  public pieChartLabels:string[] = ["New", "InProgress", "OnHold","Resolved" ,"Cancelled"];
  public pieChartType:string = 'pie';
  public pieChartOptions:any;
  public loading = false;

  constructor( private service:DashboardService ) { }

  ngOnInit() {

    this.service.pieData().subscribe((data:any)=>{

      this.loading = true;
      console.log(data);
      let pidata = [];
      let pid = data.data;
      this.newState = pid.New;
      this.inProgress = pid.inProgress;
      this.OnHold =  pid.OnHold;
      this.Resolved = pid.Resolved;
      this.Cancelled = pid.Cancelled;
      this.pieChartOptions = {'backgroundColor': [
      
        "#FF6384",
        "#4BC0C0",
        "#FF8C00",
        "#E7E9ED",
        "#36A2EB"
      ]}
      this.pieChartData = [

        this.newState,
        this.inProgress,
        this.OnHold,
        this.Resolved,
        this.Cancelled
        

      ]
      this.loading = false;
    },(err:any)=>{

      console.log(err);

    })
  }

  // events on slice click
  public chartClicked(e:any):void {
    console.log(e);
  }
 
 // event on pie chart slice hover
  public chartHovered(e:any):void {
    console.log(e);
  }

}
