import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResponse } from '../models/api-response';
import { Observable } from 'rxjs';
import { Incident } from '../models/incident';
import { Pagination } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class IncidentService {

  private headers: HttpHeaders;
  private host: string;
  public incidentServiceData: Incident;
  public numOfIncidents: number;
  public interval: any=0;
  public timeLeft: number;
  public days: number[]=[];
  public hours: number[]=[];
  public minute: number[]=[];
  public seconds: number[]=[];
  public timeString: string[]=[];
  
  constructor(private httpClient: HttpClient) {

    this.headers= new HttpHeaders({
       "Content-Type" : "application/json"
    })
    this.host= "http://localhost:3000/api/"
  }
 
  public getAllIncidents():Observable<ApiResponse>{

    let url: string = this.host + "incident/getAllIncidents"

    return this.httpClient.get<ApiResponse>(url, {headers:this.headers});

  }

  public createIncident(request: Incident):Observable<ApiResponse>{

    let url: string = this.host + "incident/createIncident"

    return this.httpClient.post<ApiResponse>(url, request, {headers:this.headers});
  }

  public editIncident(data: Incident):Observable<ApiResponse>{

    console.log(data);
    let url: string = this.host + "incident/updateIncident"

    return this.httpClient.put<ApiResponse>(url, data, {headers:this.headers});
  }

  public resolveIncident(data: Incident):Observable<ApiResponse>{

    console.log(data);
    let url: string = this.host + "incident/resolve"

    return this.httpClient.put<ApiResponse>(url, data, {headers:this.headers});
  }
   
  public getIncidentCountByGroup():Observable<ApiResponse>{

    let url: string = this.host + "incident/getIncidentCountByGroup"

    return this.httpClient.get<ApiResponse>(url, {headers:this.headers});
  }

  public getIncidentByAssignedTo():Observable<ApiResponse>{

    let url: string = this.host + "incident/getIncidentByAssignedTo"

    return this.httpClient.get<ApiResponse>(url, {headers:this.headers});
  }

  public getLastIncident():Observable<ApiResponse>{

    let url: string = this.host + "incident/getLastIncident"

    return this.httpClient.get<ApiResponse>(url, {headers:this.headers});
  }

  public getIncidentsPagination(req: Pagination):Observable<Incident>{

    let url:string = this.host + "incident/paginate";

    return this.httpClient.post<Incident>(url,req,{headers:this.headers});
  }

}
