import { Posts } from './../models/Post.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Comments } from './../models/Comments.model';

@Injectable({
  providedIn: 'root'
})
export class SocialService {
  public comments: Observable<any> = new Observable<any>;
  public comments_reply: Observable<any> = new Observable<any>;
  public comments_total: Array<any> = [];
  public vehicles: Array<any> = [];
  constructor(private http: HttpClient) { }

  private api = "http://localhost:8000/api/social/";
  private apiTour = "http://localhost:8000/api/tour";

  //get list vehicle
  getVehicles(token: string) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}vehicles`;

    return this.http.get<any>(urlApi, { headers });
  }

  //get list post social
  getPosts(token: string) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}posts`;

    return this.http.get<any>(urlApi, { headers });
  }

  //get list tour
  getTours(token: string) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.apiTour}`;

    return this.http.get<any>(urlApi, { headers });
  }

  //create post
  createPost(post:Posts,token:string):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let para = {"address_travel_id" : post.address_travel_id, "type_travel_id" : post.type_travel_id, "title" : post.title, "content":post.content, "status":post.status};
    let urlApi = `${this.api}posts`;

    return this.http.post<any>(urlApi, para,{ headers });
  }

  //favorite the post
  favorite(post_id:any, token:string):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let para = {"post_id" : post_id};
    let urlApi = `${this.api}posts/favorite`;

    return this.http.post<any>(urlApi, para, {headers});
  }

  //get list comments of the post
  getComments(token:string):Observable<any>
  {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}comments`;

    return this.http.get<Comments>(urlApi, {headers});
  }

  //comment the post
  comment(post_id:any, content:string, token:string):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let para = {"post_id" : post_id, "content" : content};
    let urlApi = `${this.api}comments`;

    return this.http.post<any>(urlApi, para, {headers});
  }

  //comment the post
  deleteComment(id:any, token:string):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token).set('Content-Type', 'application/json');
    let urlApi = `${this.api}comments/${id}`;

    return this.http.delete<any>(urlApi, {headers});
  }

  //get list comments reply of the post
  getCommentsReply(token:string):Observable<Comments>
  {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}comment-reply`;

    return this.http.get<Comments>(urlApi, {headers});
  }

  //The user reply comment other user of the post
  replyComment(comment_id:any, user_id:any, content:string, token:string):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let para = {"comment_id" : comment_id, "user_id_2" : user_id, "content" : content};
    let urlApi = `${this.api}comment-reply`;

    return this.http.post<any>(urlApi, para ,{headers});
  }

  //search user information by name
  searchUser(data:any, token:string){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}users-search`;

    return this.http.get<Comments>(urlApi, {headers:headers, params:data});
  }
}
