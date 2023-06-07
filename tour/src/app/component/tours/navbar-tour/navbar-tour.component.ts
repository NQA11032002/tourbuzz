import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { SocialService } from 'src/app/services/social.service';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-navbar-tour',
  templateUrl: './navbar-tour.component.html',
  styleUrls: ['./navbar-tour.component.scss']
})
export class NavbarTourComponent implements OnInit {
  public data: Array<any> = new Array<any>();
  public user_token:any;
  private priceTour:any = 1;
  private address_start:any = "all";
  private address_end:any = "all";
  private date_start:any;
  private date_end:any;
  public cbVehicles: Array<any> = [];

  public constructor(private address:AddressService, public vehicles: SocialService, private tour:TourService){}

  ngOnInit() {
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.user_token = token;
    }

    this.getCity();
    this. getVehicles();
  }

  getCity(){
    this.address.getCities(this.user_token).subscribe(p=>{
      this.data = p.data;
    })
  }

  //get list vehicle of the tour
  getVehicles(){
    this.vehicles.getVehicles(this.user_token).subscribe(p => {
      if(p.status == 200)
      {
        this.vehicles.vehicles = p.data;
      }
    })
  }

  //get list tours
  getTours(){
    let data = {"list" : "ok", "price" : this.priceTour, "address_start" : this.address_start, "address_end" : this.address_end, "date_start": this.date_start, "date_end": this.date_end, "vehicles" : this.cbVehicles.join(',')};

    this.tour.getTours(data, this.user_token).subscribe(p => {
      this.tour.tours = p.data;

      console.log(p);
    })
  }

//event change checked radio price tour
  onRadioPriceChange(event: any): void {
    const value = event.target.value;
    this.priceTour = value;
    this.getTours();
  }

  //event selected change address start of the tour
  onSelectAddressStartChange(event: any): void {
    const value = event.target.value;
    this.address_start = value;

    this.getTours();
  }

  //event selected change address end of the tour
  onSelectAddressEndChange(event: any): void {
    const value = event.target.value;
    this.address_end = value;

    this.getTours();
  }

  //event selected change date start of the tour
  onSelectDateStartChange(event: any): void {
    const value = event.target.value;
    this.date_start = value;
    this.getTours();
  }

  //event selected change date start of the tour
  onSelectDateEndChange(event: any): void {
    const value = event.target.value;
    this.date_end = value;
    this.getTours();
  }

  //event selected change vehicles of the tour
  onSelectVehiclesChange(event: any): void {
    const value = event.target.value;

    if (event.target.checked) {
      this.cbVehicles.push(value);
    } else {
      const index = this.cbVehicles.indexOf(value);
      if (index > -1) {
        this.cbVehicles.splice(index, 1);
      }
    }
    console.log(this.cbVehicles.join(','));
    this.getTours();
  }
}
