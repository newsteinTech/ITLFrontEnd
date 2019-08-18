import { Component, OnInit } from '@angular/core';
import { IncidentService } from 'src/app/Services/incident.service';
import { MatTableDataSource } from '@angular/material';
import { PagiReq } from 'src/app/Class/pagi-req';
import { IncPagiReq } from 'src/app/Class/inc-pagi-req';
import { Router } from '@angular/router';
import { IncByNum } from 'src/app/Class/inc-by-num';


@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent implements OnInit {

  incList;
  pagiLength:number;
  value = [];
  pageNu:IncPagiReq;
  constructor( private service:IncidentService, private routes:Router ) { }

  ngOnInit() {

    this.pageNu = new IncPagiReq(0);
    this.service.pagi(this.pageNu,this.pageNu.type.onLoad).subscribe((data:any)=>{

      console.log(data);
      this.incList = data.data.Incident;
      this.pagiLength = data.data.nuOfRec/5;
      for(let k=0;k<this.pagiLength;k++){

       this.value.push(k);
    
      }

    },(err:any)=>{

      console.log(err);

    })

  }

  private pagi(j:number){

    console.log(j);
    // this.pag.Page = j;
    this.pageNu = new IncPagiReq(j);
    this.pageNu.type.onLoad;
    this.service.pagi(this.pageNu,this.pageNu.type.onPage).subscribe((data:any)=>{

      console.log(data);
      this.incList = data.data.Incident;

    },(err:any)=>{

      console.log(err);

    })
    
  }

  private editIncident(incNum){

    console.log(incNum);
    let incNu = new IncByNum(incNum);
    this.service.getIncByNum(incNu).subscribe((data:any)=>{

      console.log(data);
      this.service.incident = data.data;
      this.routes.navigate(['editIncident']);
      // console.log(this.service.incident);

    },(err:any)=>{

      console.log(err);

    })
    // this.routes.navigate(["editIncident"]);

  }

}
