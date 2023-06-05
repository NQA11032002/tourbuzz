import { Component } from '@angular/core';
import { HistorypostTourService } from 'src/app/services/historypost-tour.service';

@Component({
  selector: 'app-historypost-tour',
  templateUrl: './historypost-tour.component.html',
  styleUrls: ['./historypost-tour.component.scss']
})
export class HistorypostTourComponent {
  public data : any = null;

  constructor(private historyposttour: HistorypostTourService){}

  ngOnInit(): void {
    this.getHistoryPostTour();
  }

  getHistoryPostTour(){
    let token = sessionStorage.getItem("token_user");
    let id = sessionStorage.getItem("id");
    let data = {
      'id_user' : id,
      "list" : "",
    };

    if(token != null){
      this.historyposttour.getHistoryPostTour(token,data).subscribe(p => {
        this.data = p.data;
        console.log(p.data);
      });
    }
  }

  deleteHistoryPostTour(id: any){
    let result = window.confirm('Bạn có chắc chắn muốn xóa bài đăng này?');
    let token = sessionStorage.getItem("token_user");
    if(result){
      if(token != null){
        this.historyposttour.deleteHistoryPostTour(token,id).subscribe(p => {
          console.log(p);
          location.reload();
        });
      }
    }else{
      console.log("Hủy xóa");
    }

  }
}
