import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChangeinforService {

  constructor(private http:HttpClient) { }

  private api = "http://localhost:8000/api/social/";

  updateInfor(token:string, id:string, data:any){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}user/${id}`;

    return this.http.patch<any>(urlApi,data,{headers});
  }
  
}
