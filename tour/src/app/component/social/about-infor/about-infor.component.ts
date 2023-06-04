import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about-infor',
  templateUrl: './about-infor.component.html',
  styleUrls: ['./about-infor.component.scss']
})
export class AboutInforComponent {
  private id:any;

  public constructor(private route: ActivatedRoute){
    this.id = this.route.snapshot.paramMap.get('id');

    //get query parameters id of user
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

}
