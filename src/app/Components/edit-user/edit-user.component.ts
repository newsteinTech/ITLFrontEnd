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
    // Group:[];
  Password:string;
  Role:string;
  constructor( private services:UsersService, private routes:Router) {

    this.userData = this.services.userData[0];
    // this.Name = this.userData.Name;
    // console.log("Name: "+ this.Name);

  }

  ngOnInit() {
  }

  editUser(userId){

    console.log(userId);
    console.log(this.userData);
    this.services.editUser(this.userData).subscribe((data:any)=>{
      console.log(data.data);
      alert("User Updated.");
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

}
