import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/models/user-login';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user: UserLogin;
  constructor(private _user: UserService, private router: Router) { }

  ngOnInit() {

    this._user.getUserByUserId(this.user).subscribe(res=>{
      console.log(res);
      //this.router.navigate(['dashboard'])
    },
    error=>{
      console.log(error);
    })
  
  }

}
