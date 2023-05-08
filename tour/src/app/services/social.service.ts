import { Posts } from './../models/Post.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Token } from '@angular/compiler';

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

  //create post
  createPost(post:Posts,token:string){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let para = {"address_travel_id" : post.address_travel_id, "type_travel_id" : post.type_travel_id, "title" : post.title, "content":post.content, "status":post.status};
    let urlApi = `${this.api}posts?bearer=${token}`;

    return this.http.post<any>(urlApi, para,{ headers });
  }

  //favorite the post
  favorite(post_id:any, token:string){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let para = {"post_id" : post_id};
    let urlApi = `${this.api}posts/favorite?bearer=${token}`;

    return this.http.post<any>(urlApi, para, {headers});
  }
}
