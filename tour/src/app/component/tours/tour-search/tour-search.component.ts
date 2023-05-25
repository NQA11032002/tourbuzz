import { Component } from '@angular/core';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-tour-search',
  templateUrl: './tour-search.component.html',
  styleUrls: ['./tour-search.component.scss']
})
export class TourSearchComponent {
  public user_information:any;
  public user_token:any;

  constructor(public tour:TourService){}

  ngOnInit(){
    let user =  sessionStorage.getItem("user_information");
    let token = sessionStorage.getItem("token_user");

    if(user != null)
    {
      let objUser = JSON.parse(user);
      this.user_information = objUser;
    }

    if(token != null){
      this.user_token = token;
    }

    this.getTours();
  }

  getTours(){
    this.tour.getTours(this.user_token).subscribe(p => {
      this.tour.tours = p.data;
      console.log(this.tour.tours);
    })
  }
}
