import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http:HttpClient){}

  private api = "http://localhost:8000/api/auth/";
  private apiUser = "http://localhost:8000/api/social/";

  //when user login call api to perform application
  login(email:string, password:string){
    let para = {"email" : email, "password" : password};
    let urlApi = `${this.api}login?email=${email}&password=${password}`;

    return this.http.post<any>(urlApi, para);
  }

  //when user register call api to perform register new user
  register(email:string, password:string, name:string, birth_date:Date){
    let para = {"email" : email, "password" : password, "name" : name, "birth_date":birth_date};
    let urlApi = `${this.api}register?email=${email}&password=${password}&name=${name}&birth_date=${birth_date}`;

    return this.http.post<any>(urlApi, para);
  }

  //when user logout call api to perform logout application
  logout(token:string){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}logout?bearer=${token}`;

    return this.http.get<any>(urlApi, {headers});
  }

  //get list friend of user login
  getFriends(token:string):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.apiUser}friends?bearer=${token}`;

    return this.http.get<any>(urlApi, {headers});
  }
  
  //get messenger with friend
  getMessenger(user_id:any, token:string):Observable<any>{
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.apiUser}friends/${user_id}?bearer=${token}`;

    return this.http.get<any>(urlApi, {headers});
  }
}
