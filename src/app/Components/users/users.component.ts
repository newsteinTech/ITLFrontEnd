import { Component, OnInit,Input } from '@angular/core';
import { UsersService } from 'src/app/Services/users.service';
import { PagiReq } from 'src/app/Class/pagi-req';
import { User } from 'src/app/Class/user';
import { ReqUser } from 'src/app/Class/req-user';
import { ReqGetUser } from 'src/app/Class/req-get-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  data = [];
  value = [];
  pag:PagiReq;
  user:ReqGetUser;
  constructor( private services:UsersService, private routes:Router ) { 

    
    this.services.getUsers().subscribe((data:any)=>{

      console.log(data.data);
      this.data = data.data;
      console.log(this.data.length);
      let num:number = (this.data.length/5);
      console.log("Num: "+num);

      for(let k=0;k<num;k++){

        this.value.push(k);

      }
      console.log(this.value);

    },(err:any)=>{

      console.log(err);
      if(err.error == "Access Denied."){

        this.routes.navigate(["/dashboard"]);
        alert("Access Denied");
        
      }

    })

  }

  ngOnInit() {
  }

  private pagi(j:number){

    console.log(j);
    // this.pag.Page = j;
    this.pag = new PagiReq(j);

    this.services.getUsersPagi(this.pag).subscribe((data:any)=>{

      console.log(data);
      this.data = data.data;

    },(error:any)=>{

      console.log(error);

    })
  }

  private editUser(userId:string){

    console.log(userId);
    this.user = new ReqGetUser(userId);
    this.services.getUserById(this.user).subscribe((data:any)=>{

      console.log(data);
      this.services.userData = data.data;
      this.routes.navigate(["editUser"]);

    },(err:any)=>{

      console.log(err);
      if(err.error == "Access Denied."){

        this.routes.navigate(["/dashboard"]);
        alert("Access Denied");
        
      }

    })

  } 

}
