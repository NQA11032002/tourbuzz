import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  public tours: Array<any> = new Array<any>();
  public tour_detail:any;

  constructor(private http: HttpClient) { }

  private api = "http://localhost:8000/api/tour";

    //get list tour popular
    getTourPopular(token:string):Observable<any>{
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      let urlApi = `${this.api}/popular`;

      return this.http.get<any>(urlApi, {headers});
    }

    //get list tour
    getTours(data:any, token:string):Observable<any>{
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      let urlApi = `${this.api}`;

      return this.http.get<any>(urlApi, {headers:headers, params:data});
    }

    //get detail tour
    getDetail(tour_id:any, token:string):Observable<any>{
      let headers = new HttpHeaders().set('Authorization', 'Bearer '+ token);
      let urlApi = `${this.api}/${tour_id}`;

      return this.http.get<any>(urlApi, {headers});
    }
}
