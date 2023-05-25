import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  public tours: Array<any> = new Array<any>();

  constructor(private http: HttpClient) { }

  private api = "http://localhost:8000/api/tour";

    //get list tour popular
    getTourPopular(token:string){
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      let urlApi = `${this.api}/popular`;

      return this.http.get<any>(urlApi, {headers});
    }

    //get list tour
    getTours(token:string){
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      let urlApi = `${this.api}`;

      return this.http.get<any>(urlApi, {headers});
    }
}
