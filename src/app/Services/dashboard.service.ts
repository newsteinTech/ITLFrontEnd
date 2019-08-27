import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incident } from '../Calss/incident';
import { IncidentRes } from '../Class/incident-res';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private header;
  private host;
  constructor( private http:HttpClient ) {

    this.header = new HttpHeaders({

      "Content-type":"application/json"

    })

    this.host = "http://localhost:3000/api/dash/";

  }

  public pieData():Observable<IncidentRes>{

    let url:string = this.host + "pie";
    return this.http.get<IncidentRes>(url,{headers:this.header});

  }

  public barData():Observable<IncidentRes>{

    let url:string = this.host + "bar";
    return this.http.get<IncidentRes>(url,{headers:this.header});

  }

  public incData():Observable<IncidentRes>{

    let url:string = this.host + "incCard";
    return this.http.get<IncidentRes>(url,{headers:this.header});

  }

  public userData():Observable<IncidentRes>{

    let url:string = this.host + "userCard";
    return this.http.get<IncidentRes>(url,{headers:this.header});

  }
}
