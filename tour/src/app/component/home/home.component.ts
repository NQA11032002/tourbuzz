import { Component, OnInit } from '@angular/core';
import { Cities } from 'src/app/models/Cities.models';
import { AddressService } from 'src/app/services/address.service';
import { SocialService } from 'src/app/services/social.service';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{
  public cities:Array<any> = new Array<any>();
  public travels:Array<any> = new Array<any>();
  public towns:Array<any> = new Array<any>();
  public vehicles:Array<any> = new Array<any>();
  public posts:Array<any> = new Array<any>();
  public tours:Array<any> = new Array<any>();
  public coloricon:Array<any> = new Array<any>();

  public constructor(private address:AddressService, private social:SocialService, private tour:TourService){
    this.getCities();
    this.typeTravels();
    this.getVehicles();
    this.getTours();
  }


  ngOnInit(){
  }

  checkAmount(amount_customer_present: number, amount_customer_maximum: number): Boolean{
    if(amount_customer_present < amount_customer_maximum){
      return false;
    }
    return true;
  }

  //get list city
  getCities(){
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.address.getCities(token).subscribe(p => {
        this.cities = p.data;
      });
    }
  }

  //get list type travel
  typeTravels(){
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.address.getTypeTravel(token).subscribe(p => {
        this.travels = p.data;
      });
    }
  }

  //get list vehicle
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

  //get list post
  getTours(){
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.tour.getTourPopular(token).subscribe(p => {
        this.tours = p.data;

        console.log(this.tours);
      });
    }
  }

  //next slide image show on home
  nextSlide(){
    let lists = document.querySelectorAll('.item');
    let slides = document.getElementById('slide');
    (slides as HTMLElement).appendChild(lists[0])
  }

  //previous slide image show on home
  previousSlide(){
    let lists = document.querySelectorAll('.item');
    let slides = document.getElementById('slide');

    (slides as HTMLElement).prepend(lists[lists.length - 1]);
  }
}
