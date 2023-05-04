import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient){}

  private api = "http://localhost:8000/api/auth/login";

  login(email:string, password:string){
    let para = {"email" : email, "password" : password};
    let urlApi = `${this.api}?email=${email}&password=${password}`;

    return this.http.post<any>(urlApi, para);
  }
}
