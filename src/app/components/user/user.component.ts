import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import {Sort} from '@angular/material/sort';
import { GroupService } from 'src/app/services/group.service';
import { LoginService } from 'src/app/services/login.service';




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
  public role: string;

  constructor(private _user: UserService, private _group: GroupService, private router: Router, private userLoggedIn: LoginService) { 
    this.pagingStartIndex = 0;
    this.displayData =[];
    this.sortedData=[];
    this.pageNum=[]; 
    this.pageSize=5; //default page size
    this.currentPage=1;
  }

  ngOnInit() {

    this.role= this.userLoggedIn.userRole;
    console.log(this.userLoggedIn.userRole)
    // get all users and set number of pages according to the number of records of users
    //and display records according to initial pagesize
    this._user.getAllUsers().subscribe(res=>{
      console.log(res);
      this.userData=res.data;
      this.sortedData= this.userData;
      this._user.numOfUsers = this.userData.length;

      let mod : number = this._user.numOfUsers % this.pageSize
      console.log(mod);
      if(mod>0) this.numberOfPages = Math.floor(this._user.numOfUsers/this.pageSize) + 1;
      else this.numberOfPages = (this._user.numOfUsers/this.pageSize) 

      console.log(this.numberOfPages)

      for(let i=0; i<this.numberOfPages; i++){
        this.pageNum.push(i+1);
      }
      console.log(this.pageNum);
      this.displayHandler(1);
    },
    error=>{
       console.log(error);
    });

    //get all groups
    this._group.getAllGroups().subscribe(res=>{
      console.log(res);
      this._group.groupServiceData = res.data;
    },
    error=>{
      console.log(error);
    })
  }


  public editUserHandler(item: any){
  
    console.log(item);
    this._user.userServiceData= item;
    this.router.navigate(['editUser']);
  }

  //for client side pagination
  public displayHandler(pageNumber: number){
   
    this.pagingStartIndex = this.pageSize * (pageNumber-1);
    this.pagingEndIndex = Number.parseInt(this.pagingStartIndex.toString()) + Number.parseInt(this.pageSize.toString()) - 1;
    //converted number to string then again to number by using parseint above, otherwise it was treating + as concatenation at some points instaed of addition
    
    this.displayData= [];
    this.pageNum=[];
  
    //update number of pages depending on page size chosen by user through front end, 
    //then accordingly update pageNum array
    let mod : number = this.userData.length % this.pageSize
    console.log(mod);
    if(mod>0) this.numberOfPages = Math.floor(this.userData.length/this.pageSize) + 1;
    else this.numberOfPages = (this.userData.length/this.pageSize)

    console.log("Numberofpages" + this.numberOfPages)

    for(let i=0; i<this.numberOfPages; i++){
      this.pageNum.push(i+1);
    }

    console.log(this.pagingStartIndex)
    console.log(this.pagingEndIndex)

    //update the data to be displayed based on above changes
    for(let i=this.pagingStartIndex; i<=this.pagingEndIndex; i++){
      if(this.sortedData[i]!=null)
      this.displayData.push(this.sortedData[i]); 
    }
    
    //update current page
    this.currentPage= pageNumber;
    console.log(this.displayData)
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