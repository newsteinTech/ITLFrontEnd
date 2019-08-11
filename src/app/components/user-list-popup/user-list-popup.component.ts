import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Pagination } from 'src/app/models/pagination';

@Component({
  selector: 'app-user-list-popup',
  templateUrl: './user-list-popup.component.html',
  styleUrls: ['./user-list-popup.component.css']
})
export class UserListPopupComponent implements OnInit {

  public userData: User[];
  public page: Pagination;
  public pageNum: number[]=[];
  public currentPage: number;
  public numOfPages: number;
  public userI: EventEmitter<number> = new EventEmitter(); // for storing userid in caller while creating incident

  constructor(private _user:UserService, private router:Router){
    this.userData=[];
    this.currentPage=1;
  }


  ngOnInit() {

      //display first five records from service when the page loads initially
      for(let i=0;i<5;i++){
        this.userData[i]= this._user.userServiceData[i];
      }

      //store page numbers in pageNum array
      let mod : number = this._user.numOfUsers % 5
      if(mod>0) this.numOfPages = Math.floor(this._user.numOfUsers / 5) + 1;
      else this.numOfPages = (this._user.numOfUsers / 5)
      console.log(this.numOfPages)

      for(let i=0;i<this.numOfPages;i++){
        this.pageNum.push(i+1)
      }
      console.log(this.pageNum);
    
  }

  //for server-side pagination
  private Paginate(num: number){

    console.log(num);
    this.page = new Pagination(num, 5);
    this.currentPage= num;

    this._user.getUsersPagination(this.page).subscribe((res:any)=>{
      console.log(res);
      this.userData = res.data;

    },
    (error:any)=>{
        console.log(error);
    })
  }


  onButtonClick(userId) {
    this.userI.emit(userId);
  }


}
