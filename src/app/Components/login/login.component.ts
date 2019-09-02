import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/Class/login';
import { LoginService } from 'src/app/Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data:Login;
  islogin:boolean;
  constructor( private services:LoginService, private routes:Router ) {

    this.data = new Login();

   }

  ngOnInit() {
  }

  login(){


    console.log(this.data);
    this.services.login(this.data).subscribe((data:any)=>{

      console.log(data);

      if(data.data == null){

        this.islogin = false;

      }else{

        let email = this.data.Email;
        console.log(data.data);
        console.log(email);
        localStorage.setItem('email',data.data);
        this.routes.navigate(['dashboard']);

      }
      

    },(err:any)=>{

      console.log(err);
      // alert("Username or pasword is wrong.");
      this.islogin = false;

    })

  }

}
