import { Component, OnInit, OnDestroy } from '@angular/core';
import { IncidentService } from 'src/app/Services/incident.service';
import { IncidentRes } from 'src/app/Class/incident-res';
import { Incident } from 'src/app/Calss/incident';
import { UsersService } from 'src/app/Services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-incident',
  templateUrl: './edit-incident.component.html',
  styleUrls: ['./edit-incident.component.css']
})
export class EditIncidentComponent implements OnInit {

  incData:Incident;
  incNumber:string;
  ci = [];
  grpData = [];
  groupMembers:[];
  grpMemFrmHtml;
  priority;
  userId;

  constructor( 
    private services:IncidentService, 
    private service2: UsersService,
    private routes:Router
    ) { 

    this.incData = new Incident();
    console.log(this.services.incident);

  }

  ngOnInit() {

    this.incData = this.services.incident;
    this.incNumber = "INC-00"+this.incData.IncidentNumber;
    
    this.services.getCI().subscribe((data:any)=>{
     
      this.ci = data.data;

    },err=>{

      console.log(err);
      if(err.error == "Access Denied."){

        this.routes.navigate(["/dashboard"]);
        alert("Access Denied");
        
      }

    });

    this.service2.getGroup().subscribe((data:any)=>{

      this.grpData = data.data;
      console.log(this.grpData);

    },(err:any)=>{

    })

  }

  getUsersInGroups(event){

    let value = event.target.value;

    if(value != "Select Group"){
      
      this.grpData.forEach(cur => {

        if(cur.Name == value){

          this.groupMembers = cur.GroupMembers;
          this.incData.AssignmentGroup = cur._id;
            
        }
        
      });
    }

  }

  setPriority(){

    let impact = this.incData.Impact;
    let urgency = this.incData.Urgency;
    if(typeof impact == "string" && typeof urgency == "string" ){

      let date = new Date();

      if(impact == "High" && urgency == "High"){

        this.priority = "Reslove within 1 Day";
        date.setDate(date.getDate()+(1));
        this.incData.sla = date;

      }else if(impact == "High" && urgency == "Medium"){

        this.priority = "Resolve within 3 Day";
        date.setDate(date.getDate()+3);
        this.incData.sla = date;

      }else if(impact == "High" && urgency == "Low"){

        this.priority = "Resolve within 1 week";
        date.setDate(date.getDate()+7);
        this.incData.sla = date;

      }else if(impact == "Medium" && urgency == "High"){

        this.priority = "Resolve within 1 days";
        console.log(date);
        date.setDate(date.getDate()+1);
        this.incData.sla = date;

      }else if(impact == "Medium" && urgency == "Medium"){

        this.priority = "Resolve within 1 week";
        date.setDate(date.getDate()+(7));
        this.incData.sla = date;

      }else if(impact == "Medium" && urgency == "Low"){

        this.priority = "Resolve within 2 week";
        date.setDate(date.getDate()+(14));
        this.incData.sla = date;

      }else if(impact == "Low" && urgency == "High"){

        this.priority = "Resolve within 4 days";
        date.setDate(date.getDate()+(4));
        this.incData.sla = date;

      }else if(impact == "Low" && urgency == "Medium"){

        this.priority = "Resolve within 2 week";
        date.setDate(date.getDate()+(14));
        this.incData.sla = date;

      }else if(impact == "Low" && urgency == "Low"){

        this.priority = "Resolve within 1 month";
        date.setDate(date.getDate()+(30));
        this.incData.sla = date;

      }
      this.incData.Priority = this.priority;

    }

  }

  setCi(event){

    let value = event.target.value;

    if(value != "Select..."){

      console.log(value);

      this.ci.forEach(cur =>{

        if(cur.Name == value){

          this.incData.ConfigurationItem = cur._id;
          
        }

      })

    }

  }

  onSubmit(){

    this.groupMembers.forEach((cur:any)=>{
     
      if(cur.Name == this.grpMemFrmHtml){
        this.incData.AssignedTo = cur._id;
      }
    })
    console.log(this.incData);

    this.services.updateInc(this.incData).subscribe((data:any)=>{

      console.log(data);
      this.routes.navigate["incidentList"];

    },(err:any)=>{

      console.log(err);

    })

    

  }

}
