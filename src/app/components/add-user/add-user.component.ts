import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public userRequest: User;
  public groupData: Group[];

  constructor(private _user: UserService, private _group: GroupService, private router: Router) {
    this.userRequest = new User();
   }

  ngOnInit() {

    this._group.getAllGroups().subscribe(res=>{
      console.log(res);
      this.groupData = res.data;
    },
    error=>{
      console.log(error);
    }) 

  }

  public createUserHandler(){
  
    console.log(this.userRequest);
    this._user.createUser(this.userRequest).subscribe(res=>{
      console.log(res);
      this.router.navigate(['userList']);
    },
    error=>{
      console.log(error);
    })
  }


}


