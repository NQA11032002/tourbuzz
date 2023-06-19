import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  private api = "http://localhost:8000/api/social/profile/";
  private apiGetFriend = "http://localhost:8000/api/social/friends/";
  private apiSocial = "http://localhost:8000/api/social/";
  private apiUploadAV = "http://localhost:8000/api/uploadAV/"
 

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

  uploadAV(token:string, data: any){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.apiUploadAV}`;

    return this.http.post<any>(urlApi, {headers: headers, params: data});
  }

  // Them ban
  addFriend(token:string, data: any){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let para = {"user_2_id" : data};
    let urlApi = `${this.api}`;

    return this.http.post<any>(urlApi, para, {headers});
  }


  // Dong y ket ban
  acceptFriend(token:string, data: any){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}`;

    return this.http.patch<any>(urlApi, data,{headers});
  }

  // Huy ket ban
  unFriend(token:string, data: any){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}`;

    return this.http.delete<any>(urlApi, {headers: headers, params: data});
  }

}
