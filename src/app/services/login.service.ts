import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserLogin } from '../models/user-login';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private headers: HttpHeaders;
  private host: string;
  public userRole: string;

  constructor(private httpClient: HttpClient) { 
    this.headers= new HttpHeaders({
      "Content-Type" : "application/json"
   })
   this.host= "http://localhost:3000/api/user/"
  }

  public userLogin(request: UserLogin):Observable<ApiResponse>{

    let url: string = this.host + "login"

    return this.httpClient.post<ApiResponse>(url, request, {headers:this.headers});
  }
}
