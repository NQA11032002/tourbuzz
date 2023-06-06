import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistorybookingTourService } from 'src/app/services/historybooking-tour.service';
declare var window: any;

@Component({
  selector: 'app-historybooking-tour',
  templateUrl: './historybooking-tour.component.html',
  styleUrls: ['./historybooking-tour.component.scss']
})
export class HistorybookingTourComponent {
  private tour_id:any;
  public data: any = null;

  constructor(private booking:HistorybookingTourService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    //get query string id tour
    this.route.queryParams.subscribe((params:any) => {
      // Use the params object to access query parameters
      this.tour_id = params.id;
    });

    this.getHistoryBookingTour();
  }

  getHistoryBookingTour(){
    let token = sessionStorage.getItem("token_user");
    let data = {
      'tour_id' : this.tour_id,
    };

    if(token != null){
      this.booking.getHistoryBookingTour(token,data).subscribe(p => {
        this.data = p.data.data;
      });
    }
  }

  //agree user is booking tour success
  agreeBookingTour(id:any){
    let token = sessionStorage.getItem("token_user");

    let data = {
      'id' : id,
      'status_booking' : 'thành công'
    };

    if(token != null){
      this.booking.agreeBookingTour(token, data).subscribe(p => {
        location.reload();
      });
    }
  }


  deleteHistoryTour(id:any){
    let result = window.confirm('Bạn có chắc chắn muốn hủy tour?');
    let token = sessionStorage.getItem("token_user");
    if(result){
      if(token != null){
        this.booking.deleteHistoryBookingTour(token,id).subscribe(p => {
          location.reload();
        });
      }
    }else{
    }

  }
}
