import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from '../Calss/incident';
import { IncidentRes } from '../Class/incident-res';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private header;
  private host;
  constructor( private http:HttpClient ) {

    this.header = new HttpHeaders({

      "Content-type":"application/json"

    });

    this.host = "http://localhost:3000/api/incident/";

  }

  public createIncident( req:Incident ):Observable<IncidentRes>{

    let url:string = this.host + "createIncident";
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

}
