import { Component } from '@angular/core';
import { HistorybookingTourService } from 'src/app/services/historybooking-tour.service';
declare var window: any;

@Component({
  selector: 'app-historybooking-tour',
  templateUrl: './historybooking-tour.component.html',
  styleUrls: ['./historybooking-tour.component.scss']
})
export class HistorybookingTourComponent {
  
  public data: any = null;
  
  constructor(private historybookingtour:HistorybookingTourService) { }

  ngOnInit(): void {
    this.getHistoryTour();
  }

  getHistoryTour(){
    let token = sessionStorage.getItem("token_user");
    let id = sessionStorage.getItem("id");
    let data = {
      'id_user' : id
    };
    console.log(data);
    if(token != null){
      this.historybookingtour.getHistoryBookingTour(token,data).subscribe(p => {
        this.data = p.data.data;
        console.log(this.data);
      });
    }
  }

  deleteHistoryTour(id:any){
    let result = window.confirm('Bạn có chắc chắn muốn hủy tour?');
    let token = sessionStorage.getItem("token_user");
    if(result){
      if(token != null){
        this.historybookingtour.deleteHistoryBookingTour(token,id).subscribe(p => {
          console.log(p);
          location.reload();
        });
      }
    }else{
      console.log("Hủy xóa");
    }
   
  }
}
