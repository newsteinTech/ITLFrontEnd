import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserLogin } from 'src/app/models/user-login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userLoginRequest: UserLogin;
  public isLogin: boolean;
  constructor(private userLoggedIn: LoginService, private router: Router, private __user: UserService) { 
    this.userLoginRequest = new UserLogin();    
  }

  ngOnInit() {
    let item= localStorage.getItem('accessToken');
    if(item!=null)
    localStorage.removeItem('accessToken');
    //console.log(item); 
  }

  public loginHandler(){

    this.__user.getUserByUserId(this.userLoginRequest).subscribe(res=>{
     this.userLoggedIn.userRole = res.data.Role;
     console.log(res);
    },
    err=>{
      console.log(err);
    })


    this.userLoggedIn.userLogin(this.userLoginRequest).subscribe(res=>{
      console.log(res.data.accessToken);

      if(res.data == null){
        this.isLogin = false;
      }
      else{
      localStorage.setItem('accessToken', res.data.accessToken)
      this.router.navigate(['dashboard'])
      }
    },
    error=>{
      console.log(error);
      this.isLogin = false;
    })  

    
  }


}
