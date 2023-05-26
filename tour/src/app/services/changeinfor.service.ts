import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChangeinforService {

  constructor(private http:HttpClient) { }

  private api = "http://localhost:8000/api/social/";
  private apiRsPass = "http://localhost:8000/api/auth/reset-password"

  updateInfor(token:string, id:any, data:any){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}users/${id}`;

    return this.http.patch<any>(urlApi,data,{headers});
  }

  updatePassword(token:string , data:any){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.apiRsPass}`;

    return this.http.patch<any>(urlApi,data,{headers});
  }
  
}
