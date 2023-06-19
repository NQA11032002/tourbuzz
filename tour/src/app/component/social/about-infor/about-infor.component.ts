import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-about-infor',
  templateUrl: './about-infor.component.html',
  styleUrls: ['./about-infor.component.scss']
})
export class AboutInforComponent {

  public data: any = null;
  public dataimg: any = null;
  public datafriends: any = null;
  public countIMG: any = null;
  public countFriends: any = null;
  private id:any;

  constructor(private userinfor : UsersService, private route: ActivatedRoute, private profile:ProfileService){
    this.id = this.route.snapshot.paramMap.get('id');

    //get query parameters id of user
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.getInfor();
    this.getIMG();
    this.getFriend();
  }

  getInfor(){
    let token = sessionStorage.getItem('token_user');
    if(token != null){
      this.userinfor.getUserInformation(this.id,token).subscribe(p=>{
        this.data = p.data;
        // console.log(this.data);
      })
    }
  }

  getIMG(){
    let token = sessionStorage.getItem('token_user');
    let data_id_user = {
      'id': this.id
    };
    if(token != null){
      this.profile.getPostsPersonal(token,data_id_user).subscribe(p=>{
        this.dataimg = p.data;

        for (const item of this.dataimg){
          if(item.post_picture[0].images.length > 0){
            this.countIMG = this.dataimg.length;
          }else{
            this.countIMG = 0;
          }
        }
        
      })

    }
  }

  getFriend(){
    let token = sessionStorage.getItem('token_user');
    let data_id = {
      'user_1_id' : this.id,
    }
    if(token != null){
      this.profile.getFriendsPersonal(token,data_id).subscribe(p=>{
        this.datafriends = p.data;
        this.countFriends = this.datafriends.length;
      })
    }
  }
}
