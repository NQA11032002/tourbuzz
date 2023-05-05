import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(private http:HttpClient) { }

  private api = "http://localhost:8000/api/social/";

}
