import { Component, OnInit, Input } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsTooltip, monkeyPatchChartJsLegend, Color } from 'ng2-charts';
import { UserService } from 'src/app/services/user.service';
import { IncidentService } from 'src/app/services/incident.service';
import { Incident } from 'src/app/models/incident';
import { GroupService } from 'src/app/services/group.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true
  };
  public pieChartLabels: Label[] = ['Software', 'Hardware', 'Database', 'Network', 'Inquiry'];
  public pieChartData: number[];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartReady: boolean= false;
  public pieChartColors: Array<any> = [
    { // all colors in order
      backgroundColor: ['#003F5C', '#58508D', '#BC5090', '#FF6361', '#FFA600']
    }
]

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    { data: [], label: 'Incidents Assigned' },
    { data: [], label: 'Incidents Resolved' }
  ];

  public barChartColors: Color[] = [
    { backgroundColor: '#58508D' },
    { backgroundColor: '#FF6361' }
  ];

  public barChartReady: boolean= false;
  public incidentData: Incident[];

  constructor(private _incident: IncidentService, private router: Router ) { 
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {

    this._incident.getAllIncidents().subscribe(data => {
      this.incidentData= data.data;
      
      this.pieChartData= [0, 0, 0, 0, 0];

      for(let i=0;i<this.incidentData.length;i++){
      switch(this.incidentData[i].Category){
        case 'Software':
        this.pieChartData[0]++; break;
        case 'Hardware':
        this.pieChartData[1]++; break;
        case 'Database':
        this.pieChartData[2]++; break;
        case 'Network':
        this.pieChartData[3]++; break;
        case 'Inquiry/Help':
        this.pieChartData[4]++; break;
        default:
        break;
      }
      
    }
    console.log(this.pieChartData)
    this.pieChartReady= true;
    },
    err=>{
      console.log(err);
    })

    this._incident.getIncidentCountByGroup().subscribe(res=>{
      console.log(res);
      this.barChartData = res.data;
      this.barChartData[0].label = 'Incidents Assigned';
      this.barChartData[1].label = 'Incidents Resolved';
      this.barChartLabels = ['Group1', 'Group2', 'Group3', 'Group4', 'Group5']
      this.barChartReady= true;
    },
    err=>{
      console.log(err);
    })

  }

  chartHovered(e){
    console.log(e)
  }

  chartClicked(){

  }

  openProfile(){
     this.router.navigate(['profile'])
  }

  createIncident(){
    this.router.navigate(['openIncident'])
  }

  incidentList(){
    this.router.navigate(['incidentList'])
  }

  incidentsAssignedToMe(){
    this.router.navigate(['incidentList'])
  }

  incidentsAssignedToMyGroups(){
    this.router.navigate(['incidentList'])
  }

  createUser(){
    this.router.navigate(['addUser'])
  }

  userList(){
    this.router.navigate(['userList'])
  }

}
