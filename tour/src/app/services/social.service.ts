import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(private http: HttpClient) { }

  private api = "http://localhost:8000/api/social/";
  private apiTour = "http://localhost:8000/api/tour";

  //get list vehicle
  getVehicles(token: string) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}vehicles?bearer=${token}`;

    return this.http.get<any>(urlApi, { headers });
  }

  //get list post social
  getPosts(token: string) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}posts?bearer=${token}`;

    return this.http.get<any>(urlApi, { headers });
  }

  //get list tour
  getTours(token: string) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.apiTour}?bearer=${token}`;

    return this.http.get<any>(urlApi, { headers });
  }
}
