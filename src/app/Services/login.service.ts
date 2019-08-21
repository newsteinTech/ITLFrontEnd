import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../Class/login';
import { IncidentRes } from '../Class/incident-res';
import { User } from '../Class/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private header;
  private host;
  public static user:Login;
  constructor( private http:HttpClient ) { 

    
    this.header = new HttpHeaders({

      "Content-type":"application/json"

    });

    this.host = "http://localhost:3000/api/user/login";

  }

  public login(req:Login):Observable<IncidentRes>{

    // Login.em = req.Email;
    console.log(Login.em);
    return this.http.post<IncidentRes>(this.host,req,{headers:this.header});

  }

}
