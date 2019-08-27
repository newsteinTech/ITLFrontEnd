import { Component, OnInit } from '@angular/core';
import { Incident } from 'src/app/models/incident';
import { IncidentService } from 'src/app/services/incident.service';
import { UserService } from 'src/app/services/user.service';
import { GroupService } from 'src/app/services/group.service';
import { Group } from 'src/app/models/group';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { UserComponent } from '../user/user.component';
import { UserListPopupComponent } from '../user-list-popup/user-list-popup.component';
import { group } from '@angular/animations';


@Component({
  selector: 'app-new-incident',
  templateUrl: './new-incident.component.html',
  styleUrls: ['./new-incident.component.css']
})
export class NewIncidentComponent implements OnInit {

  public incidentRequest: Incident;
  public groupData: Group[];
  public userData: User[];
  public subcategory: string[];
  public assignedToList: string[];
  public groupSelected: string;
  public assignedTo: User;
  public userId: string;
  public count: number;
  public IncidentNum: string;

  constructor(public dialog: MatDialog, private _incident: IncidentService, private _user: UserService, private _group: GroupService, private router: Router) {
    this.incidentRequest = new Incident();
    this.subcategory=[];
    this.assignedToList= [];
    this.groupSelected= "";
    this.assignedTo= new User();
    this.userId = "";
    
  }



  ngOnInit() {

    this._group.getAllGroups().subscribe(res=>{
      console.log(res);
      this.groupData = res.data;
    },
    error=>{
      console.log(error);
    })
    
    this._user.getAllUsers().subscribe(res=>{
      console.log(res);
      this.userData = res.data;
      this._user.userServiceData= res.data;
      this._user.numOfUsers= this.userData.length;
    },
    error=>{
      console.log(error);
    }) 

    this._incident.getLastIncident().subscribe(res=>{
      console.log(res);
      let a = res.data.IncidentNumber;
      console.log(a);
      let b = a.split(0);
      console.log(b)
      this.count = Number.parseInt(b[2]) + 1;
      console.log(this.count)
      this.IncidentNum = "INC00" + this.count;
    },
    error=>{
      console.log(error);
    })

  }


  //modal popup
  openDialog(){

    let configDialog = new MatDialogConfig();
    configDialog.autoFocus = true;
    configDialog.width = "65%";
    let diolagRef = this.dialog.open(UserListPopupComponent,configDialog);
    const sub = diolagRef.componentInstance.userI.subscribe((res)=>{
      console.log(res);
      this.userId = res;
      this.incidentRequest.Caller= this.userId;
      this.dialog.closeAll();
    }) 
  }


  public onSubmit():any {
    console.log("onsubmit")
    return alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.incidentRequest, null, 4));
  }

  public assignedToHandler(groupid: string){
  
    this.assignedToList=[];

    console.log(groupid)
    //add assignmentGroup's object in request
     for(let i=0;i<this.groupData.length;i++){
      if(this.groupData[i].GroupId==groupid){
        this.incidentRequest.AssignmentGroup= this.groupData[i]
      }
    } 

    console.log(this.incidentRequest.AssignmentGroup);

    //display groupmembers of the selected group
    for(let i=0;i<this.userData.length;i++){
      if(this.incidentRequest.AssignmentGroup.GroupMembers.indexOf(this.userData[i]._id)>=0){
        this.assignedToList.push(this.userData[i].Name)
      }
    } 
    
  }

  public createIncidentHandler(){
  
    this.incidentRequest.IncidentNumber = this.IncidentNum;
    console.log(this.incidentRequest.Subcategory);
    
       //map caller(userId) to user's objectId
      for(let i=0;i<this.userData.length;i++){
        if(this.userData[i].UserId.indexOf(this.incidentRequest.Caller)){
          this.incidentRequest.Caller = this.userData[i]._id;
        }
      }

      //add user's Object in request's AssignedTo field
      for(let i=0;i<this.userData.length;i++){
        if(this.userData[i].Name==this.assignedTo.Name){
           this.incidentRequest.AssignedTo= this.userData[i]
        }
      }

      console.log(this.incidentRequest);
      this._incident.createIncident(this.incidentRequest).subscribe(res=>{
      console.log(res);
      //this.router.navigate(['incidentList']);
      },
      error=>{
      console.log(error);
      })
  }



  public priorityHandler(impact: string, urgency: string){
 
    console.log(impact)
    console.log(urgency)

    if(impact && urgency){

    if(impact=='High' && urgency=='High'){
      this.incidentRequest.Priority='Critical - 1'
      let date = new Date();
      date.setDate(date.getDate() + 2)
      this.incidentRequest.SLA = date;
    }

    if((impact=='High' && urgency=='Medium') || (urgency=='High' && impact=='Medium')){
      this.incidentRequest.Priority='High - 2'
      let date = new Date();
      date.setDate(date.getDate() + 3)
      this.incidentRequest.SLA = date;
    }

    if((impact=='Medium' && urgency=='Medium') || (urgency=='Low' && impact=='Medium') ||
    (impact=='Low' && urgency=='Medium') || (urgency=='Low' && impact=='High') || (impact=='Low' && urgency=='Medium')){
      this.incidentRequest.Priority='Medium - 3'
      let date = new Date();
      date.setDate(date.getDate() + 7)
      this.incidentRequest.SLA = date;
    }

    if(impact=='Low' && urgency=='Low'){
      this.incidentRequest.Priority='Low - 4'
      let date = new Date();
      date.setDate(date.getDate() + 30)
      this.incidentRequest.SLA = date;
    }
   }

    console.log(this.incidentRequest.Priority)
    console.log(this.incidentRequest.SLA)

  }

  public subcategoryHandler(category: string){
    this.subcategory=[];
 
    console.log(category)
    switch(category){

      case 'Software':
        this.subcategory.push('Email')
        this.subcategory.push('Operating System')
        break
      case 'Hardware':
        this.subcategory.push('CPU')
        this.subcategory.push('Disk')
        this.subcategory.push('Keyboard')
        this.subcategory.push('Memory')
        this.subcategory.push('Monitor')
        this.subcategory.push('Mouse')
        break
      case 'Network':
        this.subcategory.push('IP Address')
        this.subcategory.push('DNS')  
        this.subcategory.push('Wireless')
        this.subcategory.push('VPN')
        break
      case 'Database':
        this.subcategory.push('Oracle')
        this.subcategory.push('SQL Server') 
        this.subcategory.push('db2')
        break 
      case 'Inquiry/Help':
        this.subcategory.push('Internal Application')
        this.subcategory.push('Antivirus')  
        break
      default:
        break
    }

    console.log(this.subcategory)
   
  }

}
