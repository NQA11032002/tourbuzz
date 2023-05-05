import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) { }

  private api = "http://localhost:8000/api/tour";

    //get list tour popular
    getTourPopular(token:string){
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      let urlApi = `${this.api}/popular?bearer=${token}`;

      return this.http.get<any>(urlApi, {headers});
    }
}
