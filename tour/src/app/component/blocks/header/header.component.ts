import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User_InformationModel } from 'src/app/models/User_Information.models';
import { SocialService } from 'src/app/services/social.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  public users: User_InformationModel[] = [];
  public searching:boolean = false;
  public user_info:User_InformationModel;
  public keyword:string = "";

  public constructor(private user:UsersService, private router:Router, private social:SocialService){
    let data = sessionStorage.getItem("user_information");
    this.user_info = new User_InformationModel();

    if(data)
    {
      let obj = JSON.parse(data);
      this.user_info.name = obj.name;
      this.user_info.image = obj.image;
      this.user_info.id = obj.id;
    }
  }

  //logout
  logout(){
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.user.logout(token).subscribe(p => {
        if(p.status === 200){
          sessionStorage.removeItem("token_user");
          sessionStorage.removeItem("user_information");

          this.router.navigate(['/', 'login'])
        }
      });
    }
  }

  //search user information
  searchUser(){
    //reset array user after search
    this.users = [];
    let token = sessionStorage.getItem("token_user");
    let data = {"name":this.keyword};

    if(token != null){
      if(this.keyword.length > 0){
        this.social.searchUser(data, token).subscribe((p:any) => {
          if(p.status === 200){
            this.users = p.data;
            this.searching = true;
            console.log(p)

          }
        });
      }else
      {
        this.searching = false;
      }
    }
  }
}
