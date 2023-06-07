import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  private api = "http://localhost:8000/api/social/profile/";
  private apiGetFriend = "http://localhost:8000/api/social/friends";
  private apiSocial = "http://localhost:8000/api/social/";

  checkFriend(token:string, data: any){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}`;

    return this.http.get<any>(urlApi, {headers: headers, params: data});
  }

  getPostsPersonal(token: string, data:any) {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.apiSocial}posts`;

    return this.http.get<any>(urlApi, {headers: headers, params: data});
  }

  // Ban be trang ca nhan
  getFriendsPersonal(token:string, data: any){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.apiGetFriend}`;

    return this.http.get<any>(urlApi, {headers: headers, params: data});
  }
}
