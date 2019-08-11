import { Component, OnInit } from '@angular/core';
import { IncidentService } from 'src/app/Services/incident.service';
import { MatTableDataSource } from '@angular/material';
import { PagiReq } from 'src/app/Class/pagi-req';


@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent implements OnInit {

  incList;
  pagiLength:number;
  value = [];
  pag;
  constructor( private service:IncidentService ) { }

  ngOnInit() {

    this.service.getAllIncident().subscribe((data:any)=>{

      this.incList = data.data;
      this.pagiLength = (this.incList.length/5);
      for(let k=0;k<this.pagiLength;k++){

        this.value.push(k);

      }
      console.log(this.value);
      console.log(this.incList);
      console.log(this.pagiLength);

    },(err)=>{

      console.log(err);

    })

  }

  private pagi(j:number){

    console.log(j);
    // this.pag.Page = j;
    this.pag = new PagiReq(j);

    
  }

}
