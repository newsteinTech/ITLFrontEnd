import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserLogin } from '../models/user-login';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private headers: HttpHeaders;
  private host: string;
  public numberOfUsers: number;
  public userServiceData: User;
  
  constructor(private httpClient: HttpClient) {

    this.headers= new HttpHeaders({
       "Content-Type" : "application/json"
    })
    this.host= "http://localhost:3000/api/"
  }
 
  public getAllUsers():Observable<ApiResponse>{

    let url: string = this.host + "user/getAllUsers"

    return this.httpClient.get<ApiResponse>(url, {headers:this.headers});

  }

  public userLogin(request: UserLogin):Observable<ApiResponse>{

    let url: string = this.host + "user/login"

    return this.httpClient.post<ApiResponse>(url, request, {headers:this.headers});
  }

  public createUser(request: User):Observable<ApiResponse>{

    let url: string = this.host + "user/createUser"

    return this.httpClient.post<ApiResponse>(url, request, {headers:this.headers});
  }

  public editUser(data: User):Observable<ApiResponse>{

    console.log(data);
    let url: string = this.host + "user/updateUser"

    return this.httpClient.put<ApiResponse>(url, data, {headers:this.headers});
  }

  public deleteUser(data: User):Observable<ApiResponse>{

    console.log(data);
    let url: string = this.host + "user/deleteUser"

    return this.httpClient.put<ApiResponse>(url, data, {headers:this.headers});
  }
}
