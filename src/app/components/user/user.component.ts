import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import {Sort} from '@angular/material/sort';




@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public userData: User[]; // data from server on get call
  public displayData: User[];
  public sortedData: User[];
  public pagingStartIndex: number;
  public pagingEndIndex: number;
  public pageSize: number;
  public numberOfPages: number;
  public pageNum: number[];
  public currentPage: number;

  constructor(private _user: UserService, private router: Router) { 
    this.pagingStartIndex = 0;
    this.displayData =[];
    this.sortedData=[];
    this.pageNum=[]; 
    this.pageSize=5; //default page size
    this.currentPage=1;
  }

  ngOnInit() {

    // get all users and set number of pages according to the number of records of users
    //and display records according to initial pagesize
    this._user.getAllUsers().subscribe(res=>{
      console.log(res);
      this.userData=res.data;
      this.sortedData= this.userData;
      this._user.numberOfUsers= this.userData.length;
      this.numberOfPages = this._user.numberOfUsers/this.pageSize;

      for(let i=0; i<this.numberOfPages; i++){
        this.pageNum.push(i+1);
      }
      console.log(this.pageNum);
      this.displayHandler(1);
    },
    error=>{
       console.log(error);
    });
  }


  public editUserHandler(item: any){
  
    console.log(item);
    this._user.userServiceData= item;
    this.router.navigate(['editUser']);
  }

  public displayHandler(pageNum: number){
   
    this.pagingStartIndex = this.pageSize * (pageNum-1);
    this.pagingEndIndex = this.pagingStartIndex + this.pageSize - 1;
    this.displayData= [];
    this.pageNum=[];
    //update number of pages depending on page size chosen by user through front end, then accordingly update pageNum array
    this.numberOfPages = this._user.numberOfUsers/this.pageSize;

    for(let i=0; i<this.numberOfPages; i++){
      this.pageNum.push(i+1);
    }

    //update data to be displayed based on above changes
    for(let i=this.pagingStartIndex, j=0; i<=this.pagingEndIndex; i++, j++){
     this.displayData[j]= this.sortedData[i]; 
    }

    //update current page
    this.currentPage= pageNum;
  }


  public sortData(sort: Sort) {
    const data = this.userData.slice();
   // console.log(sort.active)
   // console.log(sort.direction)
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'UserId': return compare(a.UserId, b.UserId, isAsc);
        case 'Name': return compare(a.Name, b.Name, isAsc);
        case 'Email': return compare(a.Email, b.Email, isAsc);
        case 'Role': return compare(a.Role, b.Role, isAsc);
        default: return 0;
      }
    });

    console.log(this.sortedData);
    //display the data according to page size and page number after sorting
    this.displayHandler(this.currentPage);
  }
}


function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}