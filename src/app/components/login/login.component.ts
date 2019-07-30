import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserLogin } from 'src/app/models/user-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public userLoginRequest: UserLogin;

  constructor(private _user: UserService, private router: Router) { 
    this.userLoginRequest = new UserLogin();
  }

  ngOnInit() {
  }

  public loginHandler(){
  
    console.log(this.userLoginRequest);
    this._user.userLogin(this.userLoginRequest).subscribe(res=>{
      console.log(res);
      this.router.navigate(['userList'])
    },
    error=>{
      console.log(error);
    })

    
  }


}
