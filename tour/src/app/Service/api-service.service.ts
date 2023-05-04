import { Injectable } from '@angular/core';
import { HttpHeaders , HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private endPoint = 'localhost:8000/api';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  }
  
  constructor(private httpClient: HttpClient) { }
  
  public getCity(): Observable<any>{
    const url = `${this.endPoint}/address/city`;
    return this.httpClient.get<any>(url, this.httpOptions);
  }
}
