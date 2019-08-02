import { Component, OnInit, EventEmitter } from '@angular/core';
import { PagiReq } from 'src/app/Class/pagi-req';
import { ReqGetUser } from 'src/app/Class/req-get-user';
import { UsersService } from 'src/app/Services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trial',
  templateUrl: './trial.component.html',
  styleUrls: ['./trial.component.css']
})
export class TrialComponent implements OnInit {

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

  userI: EventEmitter<number> =   new EventEmitter();

  onButtonClick(userId) {
    this.userI.emit(userId);
  }

}
