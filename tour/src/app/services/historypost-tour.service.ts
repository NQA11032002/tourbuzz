import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistorypostTourService {

  constructor(private http:HttpClient) { }

  private api = "http://localhost:8000/api/tour";
  
  getHistoryPostTour(token:string, data: any){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}`;

    return this.http.get<any>(urlApi, {headers: headers, params: data});  
  }
}
