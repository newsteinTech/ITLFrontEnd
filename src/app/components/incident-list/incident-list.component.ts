import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../../services/incident.service';
import { Route, Router } from '@angular/router';
import { Incident } from '../../models/incident';
import { Pagination } from '../../models/pagination';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/group';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.css']
})
export class IncidentListComponent implements OnInit {

  public incidentData: Incident[];
  public page: Pagination;
  public pageNum: number[]=[];
  public currentPage: number;
  public numOfPages: number;
  public pageSize: number;
  public userData: User[];
  public groupData: Group[];

  constructor(private _incident: IncidentService, private _user: UserService, private _group: GroupService, private router: Router) {
    this.pageSize =5;
    this.currentPage=1;
    this.incidentData=[];
   }



  ngOnInit() {

    this._incident.getAllIncidents().subscribe(res=>{
      console.log(res);
      this._incident.numOfIncidents= res.data.length 
      this._incident.timeString=[];
      this._incident.days=[];
      this._incident.hours=[];
      this._incident.minute=[];
      this._incident.seconds=[];
      //display first 5 records from service when the page loads initially
      for(let i=0;i<this.pageSize;i++){
        this.incidentData[i]= res.data[i];
      }
      this.startTimer(this.incidentData);

      // calculate number of pages acc. to pageSize
      let mod : number = this._incident.numOfIncidents % this.pageSize
      if(mod>0) this.numOfPages = Math.floor(this._incident.numOfIncidents/this.pageSize) + 1;
      else this.numOfPages = (this._incident.numOfIncidents/this.pageSize) 

      for(let i=0;i<this.numOfPages;i++){
        this.pageNum.push(i+1)
      }
    },
    error=>{
      console.log(error);
    })

    this._user.getAllUsers().subscribe(res=>{
      console.log(res)
      this.userData= res.data;
    },
    err=>{
      console.log(err)
    })

    this._group.getAllGroups().subscribe(res=>{
      console.log(res)
      this.groupData= res.data;
    },
    err=>{
      console.log(err)
    })

    
  }



  public editIncidentHandler(item: any){
  
    console.log(item);

    //send caller's userid instead of objectid
    for(let i=0;i<this.userData.length;i++){
      if(this.userData[i]._id==item.Caller){
        item.Caller = this.userData[i].UserId;
      }
    }
    this._user.userServiceList= this.userData;
    this._group.groupServiceData= this.groupData;
    this._incident.incidentServiceData= item;
    this.router.navigate(['editIncident']);
  }



  //for server-side pagination
  public Paginate(num: number){
    
    this.pageNum=[];

    //update no. of pages acc. to pageSize
    let mod : number = this._incident.numOfIncidents % this.pageSize
    if(mod>0) this.numOfPages = Math.floor(this._incident.numOfIncidents/this.pageSize) + 1;
    else this.numOfPages = (this._incident.numOfIncidents/this.pageSize) 

    for(let i=0;i<this.numOfPages;i++){
      this.pageNum.push(i+1)
    }
    
    this.page = new Pagination(num, this.pageSize);
    this.currentPage= num;

    this._incident.getIncidentsPagination(this.page).subscribe((res:any)=>{
      console.log(res);
      this.incidentData = res.data;
      this._incident.timeString=[];
      this._incident.days=[];
      this._incident.hours=[];
      this._incident.minute=[];
      this._incident.seconds=[];
      this.startTimer(this.incidentData);

    },
    (error:any)=>{
        console.log(error);
    })

  }



  private startTimer(data: any) {
    
    if(this._incident.interval){
      clearInterval(this._incident.interval);
    }
    
    this._incident.interval = setInterval(() => {
    
    for(let i=0; i<data.length;i++){

      let sla = new Date(data[i].SLA).getTime(); // getTime method returns the number of milliseconds since 1970/01/01:
      let currentTime= new Date().getTime();
      this._incident.timeLeft= Math.floor((sla - currentTime)/1000);// timeLeft is in seconds
      //console.log(this._incident.timeLeft)
      if(this._incident.timeLeft > 0) {
        this._incident.timeLeft--;
        this._incident.days[i]= Math.floor(this._incident.timeLeft/(60 * 60 * 24));
        this._incident.hours[i]= Math.floor((this._incident.timeLeft % 86400) / 3600);
        this._incident.minute[i]= Math.floor((this._incident.timeLeft % 3600) / 60);
        this._incident.seconds[i]= this._incident.timeLeft % 60;
        this._incident.timeString[i]= this._incident.days[i] + ' days ' + this._incident.hours[i] + ' hours ' 
         + this._incident.minute[i] + ' minutes ' + this._incident.seconds[i] + ' seconds'
      } 
    }
    },1000)
  
  }

}
