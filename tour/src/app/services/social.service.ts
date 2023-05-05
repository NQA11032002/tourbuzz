import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(private http:HttpClient) { }

  private api = "http://localhost:8000/api/social/";

  getSocials(token:string){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}vehicles?bearer=${token}`;

    return this.http.get<any>(urlApi, {headers});
  }

  getPosts(token:string){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}posts?bearer=${token}`;

    return this.http.get<any>(urlApi, {headers});
  }
}
