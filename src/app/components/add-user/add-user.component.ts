import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group';
import { GroupService } from 'src/app/services/group.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public userRequest: User;
  public groupData: Group[];
  public groupSelected: string[];
  public count: number;
  public Userid: string;

  constructor(private _user: UserService, private _group: GroupService, private router: Router) {
    this.userRequest = new User();
    this.groupSelected= [];
   }

  ngOnInit() {

    this._group.getAllGroups().subscribe(res=>{
      console.log(res);
      this.groupData = res.data;
    },
    error=>{
      console.log(error);
    }) 

    this._user.getLastUser().subscribe(res=>{
      console.log(res);
      this.count = Number.parseInt(res.data.UserId.slice(6)) + 1;
      this.Userid = "UserId" + this.count;
    },
    error=>{
      console.log(error);
    })

}

  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.userRequest, null, 4));
  }

  public createUserHandler(){
  
    this.userRequest.UserId = this.Userid;
    this.userRequest.Group=[];

    //map groupId from f/e to group's object and send the object in the request
    for(let i=0;i<this.groupData.length;i++){
      for(let j=0;j<this.groupSelected.length;j++){
        if(this.groupData[i].GroupId==this.groupSelected[j]){
        this.userRequest.Group.push(this.groupData[i])
        break
        }
      }
    } 
    
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


