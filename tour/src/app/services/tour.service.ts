import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  public tours: Array<any> = new Array<any>();
  public categoryPay: Array<any> = new Array<any>();
  public tour_detail:any;
  public tour_comments: Observable<any> = new Observable<any>;

  constructor(private http: HttpClient) { }

  private api = "http://localhost:8000/api/tour";
  private apiBooking = "http://localhost:8000/api/booking";
  private apiTourComment = "http://localhost:8000/api/tour-comment";
  private vehi = "http://localhost:8000/api/social/vehicles";

    //get list tour popular
    getTourPopular(token:string):Observable<any>{
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      let urlApi = `${this.api}/popular`;

      return this.http.get<any>(urlApi, {headers});
    }

    //get list tour
    getTours(data:any, token:string):Observable<any>{
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      let urlApi = `${this.api}`;

      return this.http.get<any>(urlApi, {headers:headers, params:data});
    }

    //get detail tour
    getDetail(tour_id:any, token:string):Observable<any>{
      let headers = new HttpHeaders().set('Authorization', 'Bearer '+ token);
      let urlApi = `${this.api}/${tour_id}`;

      return this.http.get<any>(urlApi, {headers});
    }

    //booking tour
    bookingTour(data:any, token:string):Observable<any>{
      let headers = new HttpHeaders().set('Authorization', 'Bearer '+ token);
      let urlApi = `${this.apiBooking}`;

      return this.http.post<any>(urlApi, data ,{headers});
    }

    //get list categories pay
    getCategoriesPay(token:string){
      let headers = new HttpHeaders().set('Authorization', 'Bearer '+ token);
      let urlApi = `${this.apiBooking}/categories-pay`;

      return this.http.get<any>(urlApi, {headers});
    }

    // //comment tour 
    // commentTour(data:any, token:string){
    //   let headers = new HttpHeaders().set('Authorization', 'Bearer '+ token);
    //   let urlApi = `${this.apiTourComment}`;

    //   return this.http.post<any>(urlApi, data ,{headers});
    // }

    getVehicle(token:string){
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      let urlApi = `${this.vehi}`;

      return this.http.get<any>(urlApi, {headers});
    }

    postTour(data: any,token:string) {
      let headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
      let urlApi = `${this.api}`;
  
      return this.http.post<any>(urlApi,data,{headers});
    }
}
