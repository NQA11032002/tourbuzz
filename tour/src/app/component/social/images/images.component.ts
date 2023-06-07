import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent {
  public dataimg: any = null;
  public id_params: any;
  constructor(private profile:ProfileService, private route:ActivatedRoute){
    this.route.queryParams.subscribe(params => {
      this.id_params = params['id'];
    });
  }

  ngOnInit() {
    this.getIMG();
  }

  getIMG(){
    let token = sessionStorage.getItem('token_user');
    let data_id_user = {
      'id': this.id_params
    }
    if(token != null){
      this.profile.getPostsPersonal(token,data_id_user).subscribe(p=>{
        this.dataimg = p.data;
        console.log(p.data);
      })
    }
  }
}
