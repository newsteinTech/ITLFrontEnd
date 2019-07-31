import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';
import { ReqUser } from 'src/app/Class/req-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userData:ReqUser;
  constructor( private services:UsersService, private routes:Router ) { 

    this.userData = new ReqUser("","","","",[],"","");

  }

  ngOnInit() {
  }

  createUser(){

    console.log(this.userData);
    this.userData.PhoneNo = "97737"+Math.floor(Math.random()*1000);
    this.services.createUser(this.userData).subscribe((data)=>{

      console.log(data);
      alert("User Created.");
      this.routes.navigate(["users"]);

    },(error)=>{

      console.log(error);

    })  

  }

}
