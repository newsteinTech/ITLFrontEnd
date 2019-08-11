import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Class/user';
import { Observable } from 'rxjs';
import { PagiReq } from '../Class/pagi-req';
import { ReqUser } from '../Class/req-user';
import { ReqGetUser } from '../Class/req-get-user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private header;
  private host;
  public userData:ReqUser;
  constructor( private httpClient:HttpClient ) {

    this.header = new HttpHeaders({

      "Content-type":"application/json"

    })

    this.host = "http://localhost:3000/api/user/";

  }

  public getUsers():Observable<User>{

    let url:string = this.host + "getAllUsers";
    return this.httpClient.get<User>(url,{headers:this.header});

  }

  public getUsersPagi(req:PagiReq):Observable<User>{
    let url:string = this.host + "pagi";
    return this.httpClient.post<User>(url,req,{headers:this.header});
  }

  public editUser(req:ReqUser):Observable<User>{
    let url:string = this.host + "updateUser";
    return this.httpClient.post<User>(url,req,{headers:this.header});
  }

  //Get user by id
  public getUserById(req:ReqGetUser):Observable<User>{
    let url:string = this.host + "getUser";
    return this.httpClient.post<User>(url,req,{headers:this.header});
  }

  public deleteUser(req:ReqGetUser):Observable<User>{
    let url:string = this.host + "deleteUser";
    console.log("URL: "+url);
    return this.httpClient.post<User>(url,req,{headers:this.header});
  }

  public createUser(req:ReqUser):Observable<User>{
    let url:string = this.host + "createUser";
    return this.httpClient.post<User>(url,req,{headers:this.header});
  }

  public getGroup():Observable<User>{
    let url:string = "http://localhost:3000/api/group/getGroups";
    return this.httpClient.get<User>(url);
  }

}
