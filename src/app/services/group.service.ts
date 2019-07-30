import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private headers: HttpHeaders;
  private host: string;

  constructor(private httpClient: HttpClient) {

    this.headers= new HttpHeaders({
       "Content-Type" : "application/json"
    })
    this.host= "http://localhost:3000/api/"
  }
 
   public getAllGroups():Observable<ApiResponse>{

    let url: string = this.host + "group/getAllGroups"

    return this.httpClient.get<ApiResponse>(url, {headers:this.headers});

  }
}
