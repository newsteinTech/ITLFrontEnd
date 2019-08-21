import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from '../Calss/incident';
import { IncidentRes } from '../Class/incident-res';
import { PagiReq } from '../Class/pagi-req';
import { IncPagiReq } from '../Class/inc-pagi-req';
import { IncByNum } from '../Class/inc-by-num';
import { LoginService } from './login.service';
import { Login } from '../Class/login';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private header;
  private host;
  public incident:Incident;
  public user;
  constructor( private http:HttpClient ) {

    console.log(Login);
    let token = localStorage.getItem('email');
    console.log(token);
    this.header = new HttpHeaders({

      "Content-type":"application/json",
      "Authorization":token

    });

    this.host = "http://localhost:3000/api/incident/";

  }

  public createIncident( req:Incident ):Observable<IncidentRes>{

    let url:string = this.host + "createIncident";
    return this.http.post<IncidentRes>(url,req,{headers:this.header});

  }

  public updateInc(req:Incident):Observable<IncidentRes>{

    let url:string = this.host + "updateIncident";
    return this.http.post<IncidentRes>(url,req,{headers:this.header});

  }

  public getAllIncident():Observable<Incident>{

    let url:string = this.host + "getAllIncident";
    return this.http.get<Incident>(url);

  }

  public getIncNumber():Observable<Incident>{

    let url:string = this.host + "incNum";
    return this.http.get<Incident>(url);

  }

  public pagi(req:IncPagiReq,type:any):Observable<IncidentRes>{

    let url:string = this.host + "pagiInc";
    req.type = type;
    console.log(type);
    console.log(req);
    return this.http.post<IncidentRes>(url,req,{headers:this.header});

  }

  public getIncByNum(req:IncByNum):Observable<IncidentRes>{

    let url:string = this.host + "incByNum";
    return this.http.post<IncidentRes>(url,req,{headers:this.header});

  }

  public getCI():Observable<IncidentRes>{

    let url:string = "http://localhost:3000/api/ci/getCi";
    return this.http.get<IncidentRes>(url);

  }

  

}
