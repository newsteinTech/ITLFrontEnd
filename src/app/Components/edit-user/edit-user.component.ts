import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';
import { ReqUser } from 'src/app/Class/req-user';
import { Router } from '@angular/router';
import { ReqGetUser } from 'src/app/Class/req-get-user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userData:ReqUser;
  userId:ReqGetUser;
  Name:string;
  Email:string;
  PhoneNo:string;
  UserId:string;
  Group:Array<any>;
  existingGroups: Array<any>;
  Password:string;
  Role:string;
  constructor( private services:UsersService, private routes:Router) {

    this.userData = this.services.userData[0];
    console.log(this.userData.Group);
    this.Group = this.userData.Group;
    this.services.getGroup().subscribe((data:any)=>{
      console.log(data);
      this.existingGroups = data.data;
      console.log(this.existingGroups);
    },(err:any)=>{
      console.log(err);
    })
    
    // this.Name = this.userData.Name;
    // console.log("Name: "+ this.Name);

  }

  ngOnInit() {
  }

  editUser(userId){

    console.log(userId);
    // console.log(this.userData);
    console.log(this.Group);
    this.services.editUser(this.userData).subscribe((data:any)=>{
      console.log(data.data);
      alert("User Updated.");
      this.routes.navigate(['users']);
    },(error)=>{
      console.log(error);
    })
    // this.userData = new ReqUser()
    // this.services.editUser()

  }

  deleteUser(userId){

    console.log(this.userData.UserId);
    this.userId = new ReqGetUser(this.userData.UserId);
    console.log(" from delUser.");
    console.log(`${this.userId.UserId}`);
    this.services.deleteUser(userId).subscribe((data:any)=>{
      console.log(data)
      // alert(` is deleted` );
      // this.routes.navigate(["users"]);
    },(err)=>{
      console.log(err);
    })

  }

  getgroup(group){
    console.log(group);
    let index = this.Group.indexOf(group);
    this.Group.splice(index,1);
    console.log(this.Group);
  }
  selectGroup(group){
    
    let index = this.Group.indexOf(group);
    if(index == -1){
      this.Group.push(group);
    }
  
  }

}
