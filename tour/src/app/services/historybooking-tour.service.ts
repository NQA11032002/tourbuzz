import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistorybookingTourService {

  constructor(private http:HttpClient) { }

  private api = "http://localhost:8000/api/booking";

  getHistoryBookingTour(token:string, data: any){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}`;

    return this.http.get<any>(urlApi, {headers: headers, params: data});
  }

  agreeBookingTour(token:string, data: any){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}/agree`;

    return this.http.patch<any>(urlApi, data, {headers});
  }

  deleteHistoryBookingTour(token:string, id: any){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}/${id}`;

    return this.http.delete<any>(urlApi, {headers});
  }
}
