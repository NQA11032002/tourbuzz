import { Component } from '@angular/core';
import { Cities } from 'src/app/models/Cities.models';
import { AddressService } from 'src/app/services/address.service';
import { SocialService } from 'src/app/services/social.service';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public cities:Array<any> = new Array<any>();
  public travels:Array<any> = new Array<any>();
  public towns:Array<any> = new Array<any>();
  public vehicles:Array<any> = new Array<any>();
  public posts:Array<any> = new Array<any>();
  public tours:Array<any> = new Array<any>();

  public constructor(private address:AddressService, private social:SocialService, private tour:TourService){
    this.getCities();
    this.typeTravels();
    this.getVehicles();
    this.getPosts();
    this.getTours();

  }

  getCities(){
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.address.getCities(token).subscribe(p => {
        this.cities = p.data;
      });
    }
  }

  typeTravels(){
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.address.getTypeTravel(token).subscribe(p => {
        this.travels = p.data;
      });
    }
  }

  getVehicles(){
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.social.getVehicles(token).subscribe(p => {
        this.vehicles = p.data;
      });
    }
  }

  getPosts(){
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.social.getPosts(token).subscribe(p => {
        this.posts = p.data;
      });
    }
  }

  getTours(){
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.tour.getTourPopular(token).subscribe(p => {
        this.tours = p.data;
      });
    }
  }

}
