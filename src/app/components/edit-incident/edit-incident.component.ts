import { Component, OnInit } from '@angular/core';
import { Incident } from '../../models/incident';
import { IncidentService } from '../../services/incident.service';
import { Router } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/group';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-edit-incident',
  templateUrl: './edit-incident.component.html',
  styleUrls: ['./edit-incident.component.css']
})
export class EditIncidentComponent implements OnInit {

  public updatedData: Incident;
  public subcategory: string[];
  public groupData: Group[];
  public userData: User[];
  public assignedToList: any[];
  public days: number;
  public hours: number;
  public minute: number;
  public seconds: number;
  public remainingSLA: string;
  public assignedMember: string;
  public asg: string;

  constructor(private _incident: IncidentService, private _group: GroupService, private _user: UserService, private router: Router) { 
    this.assignedToList= [];
  }

  ngOnInit() {

    this.updatedData = this._incident.incidentServiceData;
    this.asg = this.updatedData.AssignmentGroup.GroupId;
    this.assignedMember = this.updatedData.AssignedTo.Name;
    console.log(this.updatedData);
    this.updatedData.remTime = (new Date(this.updatedData.SLA).getTime() - new Date().getTime())/1000;
    this.startTimer(this.updatedData.remTime);
    this.userData= this._user.userServiceList;
    this.groupData= this._group.groupServiceData;

    //to display subcategory when page loads
    this.subcategoryHandler(this.updatedData.Category);

  }

  public updateIncidentHandler(){

    //add user's Object in AssignedTo field
    /* for(let i=0;i<this.userData.length;i++){
      if(this.userData[i].Name==this.updatedData.AssignedTo.Name){
         this.updatedData.AssignedTo= this.userData[i]
      }
    } */

    this.assignedToList.forEach((cur:any)=>{
     
      if(cur.Name == this.assignedMember){
        this.updatedData.AssignedTo = cur._id;
      }
    })

    //send back caller's objectid instead of userid
    for(let i=0;i<this.userData.length;i++){
      if(this.userData[i].UserId==this.updatedData.Caller){
        this.updatedData.Caller = this.userData[i]._id;
      }
    }

    console.log(this.updatedData);
    this._incident.editIncident(this.updatedData).subscribe(res=>{
      console.log(res);
      this.router.navigate(['incidentList'])
    },
    error=>{
      console.log(error);
    })
  }


  public onSubmit():any {
    console.log("onsubmit")
    return alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.updatedData, null, 4));
  }


  public assignedToHandler(event){

    let value = event.target.value;

    if(value != "Select Group"){
      
      this.groupData.forEach(cur => {

        if(cur.GroupId == value){

          console.log(cur.GroupMembers)
          this.assignedToList = cur.GroupMembers;
          this.updatedData.AssignmentGroup = cur;
            
        }
        
      });
    }

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


  public priorityHandler(impact: string, urgency: string){
 
    console.log(impact)
    console.log(urgency)

    if(impact && urgency){

    if(impact=='High' && urgency=='High'){
      this.updatedData.Priority='Critical - 1'
      let date = new Date();
      date.setDate(date.getDate() + 2)
      this.updatedData.SLA = date;
    }

    if((impact=='High' && urgency=='Medium') || (urgency=='High' && impact=='Medium')){
      this.updatedData.Priority='High - 2'
      let date = new Date();
      date.setDate(date.getDate() + 3)
      this.updatedData.SLA = date;
    }

    if((impact=='Medium' && urgency=='Medium') || (urgency=='Low' && impact=='Medium') ||
    (impact=='Low' && urgency=='High') || (urgency=='Low' && impact=='High') || (impact=='Low' && urgency=='Medium')){
      this.updatedData.Priority='Medium - 3'
      let date = new Date();
      date.setDate(date.getDate() + 7)
      this.updatedData.SLA = date;
    }

    if(impact=='Low' && urgency=='Low'){
      this.updatedData.Priority='Low - 4'
      let date = new Date();
      date.setDate(date.getDate() + 20)
      this.updatedData.SLA = date;
    }
   }

  }


  private startTimer(remainingTime: number) {

    if(this._incident.interval){
      clearInterval(this._incident.interval);
    }
    this._incident.timeLeft= Math.floor(remainingTime);// remainingTime is in seconds, so is timeLeft
    console.log(this._incident.timeLeft)
    this._incident.interval = setInterval(() => {
      if(this._incident.timeLeft > 0) {
        this._incident.timeLeft--;
        this.days= Math.floor(this._incident.timeLeft/(60 * 60 * 24));
        this.hours= Math.floor((this._incident.timeLeft % 86400) / 3600);
        this.minute= Math.floor((this._incident.timeLeft % 3600) / 60);
        this.seconds= this._incident.timeLeft % 60;
      } 
    },1000)
  } 

}
