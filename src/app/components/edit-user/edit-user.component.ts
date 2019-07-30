import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/services/group.service';
import { Group } from 'src/app/models/group';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public updatedData: User; 
  public groupData: Group[];
  
  constructor(private _user: UserService, private _group: GroupService, private router: Router) { 
    this.updatedData = new User();
  }

  ngOnInit() {
  
    this.updatedData = this._user.userServiceData;
    console.log(this.updatedData);

    this._group.getAllGroups().subscribe(res=>{
      console.log(res);
      this.groupData = res.data;
    },
    error=>{
      console.log(error);
    }) 

  }

  public updateUserHandler(){

  console.log(this.updatedData);
    this._user.editUser(this.updatedData).subscribe(res=>{
      console.log(res);
    },
    error=>{
      console.log(error);
    })

    this.router.navigate(['userList'])
  }

  public deleteUserHandler(user: any){
  
    console.log(user);
    this._user.deleteUser(user).subscribe(res=>{
      console.log(res);
    },
    error=>{
      console.log(error);
    })
    this.router.navigate(['userList']);
    
  }

}
