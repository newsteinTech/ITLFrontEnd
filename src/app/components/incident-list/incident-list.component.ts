import { Component, OnInit } from '@angular/core';
import { IncidentService } from 'src/app/services/incident.service';
import { Route, Router } from '@angular/router';
import { Incident } from 'src/app/models/incident';
import { Pagination } from 'src/app/models/pagination';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { GroupService } from 'src/app/services/group.service';
import { Group } from 'src/app/models/group';

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
      //display first 5 records from service when the page loads initially
      for(let i=0;i<this.pageSize;i++){
        this.incidentData[i]= res.data[i];
      }

      let mod : number = this._incident.numOfIncidents % this.pageSize
      console.log(mod);
      if(mod>0) this.numOfPages = Math.floor(this._incident.numOfIncidents/this.pageSize) + 1;
      else this.numOfPages = (this._incident.numOfIncidents/this.pageSize) 

      console.log(this.numOfPages)

      for(let i=0;i<this.numOfPages;i++){
        this.pageNum.push(i+1)
      }
      console.log(this.pageNum);

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
      if(this.userData[i]._id.indexOf(item.Caller)){
        item.Caller = this.userData[i].UserId;
      }
    }
    this._user.userServiceList= this.userData;
    this._group.groupServiceData= this.groupData;
    this._incident.incidentServiceData= item;
    this.router.navigate(['editIncident']);
  }

  //for server-side pagination
  private Paginate(num: number){
    
    this.pageNum=[];

    //update no. of pages acc. to pageSize
    let mod : number = this._incident.numOfIncidents % this.pageSize
    if(mod>0) this.numOfPages = Math.floor(this._incident.numOfIncidents/this.pageSize) + 1;
    else this.numOfPages = (this._incident.numOfIncidents/this.pageSize) 

    console.log(this.numOfPages)

    for(let i=0;i<this.numOfPages;i++){
      this.pageNum.push(i+1)
    }
    console.log(this.pageNum);
    
    this.page = new Pagination(num, this.pageSize);
    this.currentPage= num;

    this._incident.getIncidentsPagination(this.page).subscribe((res:any)=>{
      console.log(res);
      this.incidentData = res.data;

    },
    (error:any)=>{
        console.log(error);
    })
  }

}
