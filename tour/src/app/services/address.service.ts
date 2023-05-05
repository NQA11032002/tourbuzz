import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Cities } from '../models/Cities.models';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http:HttpClient) { }

  private api = "http://localhost:8000/api/address/";

  getCities(token:string){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}city?bearer=${token}`;

    return this.http.get<any>(urlApi, {headers});
  }

  getDistrict(token:string){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}district?bearer=${token}`;

    return this.http.get<any>(urlApi, {headers});
  }

  getTown(token:string){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}town?bearer=${token}`;

    return this.http.get<any>(urlApi, {headers});
  }

  getAddressTravel(token:string){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}address-travel?bearer=${token}`;

    return this.http.get<any>(urlApi, {headers});
  }

  getTypeTravel(token:string){
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    let urlApi = `${this.api}type-travel?bearer=${token}`;

    return this.http.get<any>(urlApi, {headers});
  }
}
