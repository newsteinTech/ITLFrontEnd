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
  existingGroups: Array<any>;
  constructor( private services:UsersService, private routes:Router ) { 

    this.userData = new ReqUser("","","","",[],"","");
    this.services.getGroup().subscribe((data:any)=>{
      console.log(data);
      this.existingGroups = data.data;
      console.log(this.existingGroups);
    },(err:any)=>{
      if(err.error == "Access Denied."){

        this.routes.navigate(["/dashboard"]);
        alert("Access Denied");
        
      }
    })

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
      if(error.error == "Access Denied."){

        this.routes.navigate(["/dashboard"]);
        alert("Access Denied");
        
      }

    })  

  }

}
