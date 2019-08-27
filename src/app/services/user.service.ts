import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';
import { UserLogin } from '../models/user-login';
import { Pagination } from '../models/pagination';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers: HttpHeaders;
  private host: string;
  public userServiceData: User;
  public numOfUsers: number;
  public userServiceList: User[];
  
  constructor(private httpClient: HttpClient) {

    let token= localStorage.getItem('accessToken');

    this.headers= new HttpHeaders({
       "Content-Type" : "application/json",
       "Authorization": token
    })
    this.host= "http://localhost:3000/api/user/"
  }
 
  public getAllUsers():Observable<ApiResponse>{

    let url: string = this.host + "getAllUsers"

    return this.httpClient.get<ApiResponse>(url, {headers:this.headers});

  }

  public getUserByUserId(data: UserLogin):Observable<ApiResponse>{

    let url: string = this.host + "getUserByUserId"

    return this.httpClient.post<ApiResponse>(url, data, {headers:this.headers});

  }

  public userLogin(request: UserLogin):Observable<ApiResponse>{

    let url: string = this.host + "login"

    return this.httpClient.post<ApiResponse>(url, request, {headers:this.headers});
  }

  public createUser(request: User):Observable<ApiResponse>{

    let url: string = this.host + "createUser"

    return this.httpClient.post<ApiResponse>(url, request, {headers:this.headers});
  }

  public editUser(data: User):Observable<ApiResponse>{

    console.log(data);
    let url: string = this.host + "updateUser"

    return this.httpClient.put<ApiResponse>(url, data, {headers:this.headers});
  }

  public deleteUser(data: User):Observable<ApiResponse>{

    console.log(data);
    let url: string = this.host + "deleteUser"

    return this.httpClient.put<ApiResponse>(url, data, {headers:this.headers});
  }

  public getLastUser():Observable<ApiResponse>{

    let url: string = this.host + "getLastUser"

    return this.httpClient.get<ApiResponse>(url, {headers:this.headers});
  }

  public getUsersPagination(req:Pagination):Observable<User>{

    let url:string = this.host + "paginate";

    return this.httpClient.post<User>(url,req,{headers:this.headers});
  }


}
