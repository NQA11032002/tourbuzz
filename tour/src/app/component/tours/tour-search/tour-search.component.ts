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
  public keyword:string = "";
  public orderBy:number = 0;

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

  //get list tours
  getTours(){
      let data = {"title" : this.keyword, "order": this.orderBy};
      this.tour.getTours(data, this.user_token).subscribe(p => {
        this.tour.tours = p.data;
      })
  }

  //search tour
  searchTour(){
    this.getTours();
  }

  //select order by 
  onSelectOrderByChange(event:any){
    const selectedValue = event.target.value;
    this.orderBy = selectedValue;

    this.getTours();
  }
}
