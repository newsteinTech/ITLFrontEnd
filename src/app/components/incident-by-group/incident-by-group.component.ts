import { Component, OnInit } from '@angular/core';
import { Incident } from 'src/app/models/incident';
import { IncidentService } from 'src/app/services/incident.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incident-by-group',
  templateUrl: './incident-by-group.component.html',
  styleUrls: ['./incident-by-group.component.css']
})
export class IncidentByGroupComponent implements OnInit {

  public incidentData: Incident[];
  
  constructor(private _incident: IncidentService, private router: Router) { }

  ngOnInit() {

    this._incident.getIncidentByGroup().subscribe(res=>{
      console.log(res);
      this.incidentData= res.data;
    },
    error=>{
      console.log(error);
    })
  }

  public editIncidentHandler(item: any){
  
    console.log(item);
    this._incident.incidentServiceData= item;
    this.router.navigate(['editIncident']);
  }

}
