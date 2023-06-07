import { Component } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {
  public data: any = null;
  private id:any;
  constructor(private profileService : ProfileService, private route: ActivatedRoute){
    this.id = this.route.snapshot.paramMap.get('id');
        //get query parameters id of user
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.getFriends();
  }

  getFriends(){
    let token = sessionStorage.getItem('token_user');
    let id_user = sessionStorage.getItem('id');
    let data_id_user = {
      'user_2_id' : this.id,
    }
    if(token != null){
      this.profileService.getFriendsPersonal(token,data_id_user).subscribe(p=>{
        this.data = p.data;
        console.log("GET IMG: "+this.data);
      })
    }
  }
}
