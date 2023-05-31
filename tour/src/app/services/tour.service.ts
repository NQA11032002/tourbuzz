import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(private http: HttpClient) { }

  private api = "http://localhost:8000/api/tour";

  private vehi = "http://localhost:8000/api/social/vehicles";

    //get list tour popular
    getTourPopular(token:string){
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      let urlApi = `${this.api}/popular`;

      return this.http.get<any>(urlApi, {headers});
    }

    getVehicle(token:string){
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      let urlApi = `${this.vehi}`;

      return this.http.get<any>(urlApi, {headers});
    }

    //when user postTour call api to perform postTour
  postTour(data: any,token:string) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}`;

    return this.http.post<any>(urlApi,data,{headers});
  }
}
