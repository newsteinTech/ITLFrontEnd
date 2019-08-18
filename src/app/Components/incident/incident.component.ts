import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UsersComponent } from '../users/users.component';
import { TrialComponent } from '../trial/trial.component';
import { IncidentService } from 'src/app/Services/incident.service';
import { Incident } from 'src/app/Calss/incident';
import { UsersService } from 'src/app/Services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent implements OnInit {

  userId;
  createInc:Incident;
  grpData;
  grp;
  groupMembers;
  grpMemFrmHtml;
  incNum;
  impact;
  priority;
  ci;

  constructor( 
    private dialog:MatDialog,
    private service:IncidentService,
    private getGrp:UsersService,
    private routes:Router
    ) {

    this.userId = "";
    this.createInc = new Incident();
    this.getGrp.getGroup().subscribe((data:any)=>{

      this.grpData = data.data;
      console.log(this.grpData);
      console.log(this.grpData[3].GroupMembers);

    },(err:any)=>{

    });

  }

  ngOnInit() {

    this.service.getIncNumber().subscribe((data:any)=>{

      this.incNum = data.data;
      console.log(this.incNum);
      // console.log(this.incNum);
      if(this.incNum.length > 0){

        let num:number = this.incNum[0].IncidentNumber;
        this.incNum = "INC-00"+(num + 1);
        let newNum = num + 1;
        
        console.log(typeof num);
        this.createInc.IncidentNumber = newNum;
        console.log(typeof this.createInc.IncidentNumber);

      }else{

        this.incNum = "INC-001";
        this.createInc.IncidentNumber = 1;

      }

    },(err)=>{
      console.log(err);
    });

    this.service.getCI().subscribe((data:any)=>{

      console.log(data);
      this.ci = data.data;

    },(err:any)=>{

      console.log(err);

    })

  }

  getUsers(){

    console.log("Users");
    let configDialog = new MatDialogConfig();
    configDialog = new MatDialogConfig();
    // configDialog.disableClose = true;
    configDialog.autoFocus = true;
    configDialog.width = "65%";
    let diolagRef = this.dialog.open(TrialComponent,configDialog);
    const sub = diolagRef.componentInstance.userI.subscribe((data)=>{
      console.log(data);
      this.userId = data;
     
      this.dialog.closeAll();
    })

  }

  setPriority(){

    let impact = this.createInc.Impact;
    let urgency = this.createInc.Urgency;
    if(typeof impact == "string" && typeof urgency == "string" ){

      if(impact == "High" && urgency == "High"){
        this.priority = "Reslove within 1 Hour";
      }else if(impact == "High" && urgency == "Medium"){
        this.priority = "Resolve within 1 Day";
      }else if(impact == "High" && urgency == "Low"){
        this.priority = "Resolve within 1 week";
      }else if(impact == "Medium" && urgency == "High"){
        this.priority = "Resolve within 1 days";
      }else if(impact == "Medium" && urgency == "Medium"){
        this.priority = "Resolve within 1 week";
      }else if(impact == "Medium" && urgency == "Low"){
        this.priority = "Resolve within 2 week";
      }else if(impact == "Low" && urgency == "High"){
        this.priority = "Resolve within 4 days";
      }else if(impact == "Low" && urgency == "Medium"){
        this.priority = "Resolve within 2 week";
      }else if(impact == "Low" && urgency == "Low"){
        this.priority = "Resolve within 1 month";
      }
      this.createInc.Priority = this.priority;

    }

  }

  onSubmit(){

    
    this.createInc.Caller = this.userId._id;

    // console.log(this.createInc);
    console.log(this.grpMemFrmHtml);
    console.log(this.groupMembers);
    this.groupMembers.forEach(cur=>{
      // console.log(cur);
      if(cur.Name == this.grpMemFrmHtml){
        this.createInc.AssignedTo = cur._id;
      }
    })
    console.log(this.createInc);
    this.service.createIncident(this.createInc).subscribe((data:any)=>{

      console.log(data);
      window.location.reload();
      
    },(err:any)=>{

      console.log(err);

    })

    

  }

  getUsersInGroups(event){
    
    let value = event.target.value;

    if(value != "Select Group"){
      
      this.grpData.forEach(cur => {

        if(cur.Name == value){

          this.groupMembers = cur.GroupMembers;
          this.createInc.AssignmentGroup = cur._id;
            
        }
        
      });
    }
  }

  setCi(event){

    let value = event.target.value;

    if(value != "Select..."){

      console.log(value);

      this.ci.forEach(cur =>{

        if(cur.Name == value){

          this.createInc.ConfigurationItem = cur._id;
          
        }

      })

    }

  }

}
