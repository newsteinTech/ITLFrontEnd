import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { GroupService } from '../../services/group.service';
import { Group } from '../../models/group';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public updatedData: User; 
  public groupData: Group[];
  public currentGroups: string[]=[];
  public updatedGroups: string[]=[];
  
  constructor(private _user: UserService, private _group: GroupService, private router: Router) { 
    this.updatedData = new User();
  }

  ngOnInit() {
  
    this.updatedData = this._user.userServiceData;
    console.log(this.updatedData);

    this.groupData = this._group.groupServiceData 
    console.log(this.groupData)
   
    //to display current groupids
    for(let i=0;i<this.updatedData.Group.length;i++){
      this.currentGroups.push(this.updatedData.Group[i].GroupId)
    }

  }


  public updateUserHandler(){

    this.updatedData.Group=[];

    //map groupid from frontend to object of the group and send the object in request
    for(let i=0; i<this.updatedGroups.length; i++){
      for(let j=0;j<this.groupData.length;j++){
        if(this.updatedGroups[i]==this.groupData[j].GroupId){
          this.updatedData.Group.push(this.groupData[j]);
        }
      }
    } 

    console.log(this.updatedData);
    this._user.editUser(this.updatedData).subscribe(res=>{
      console.log(res);
      this.router.navigate(['userList'])
    },
    error=>{
      console.log(error);
    })

   
  }

  public deleteUserHandler(user: any){
  
    console.log(user);
    this._user.deleteUser(user).subscribe(res=>{
      console.log(res);
      this.router.navigate(['userList']);
    },
    error=>{
      console.log(error);
    })
    
    
  }

}
