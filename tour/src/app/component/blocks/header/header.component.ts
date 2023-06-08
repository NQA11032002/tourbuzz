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
export class HeaderComponent {
  public users: User_InformationModel[] = [];
  public searching: boolean = false;
  public keyword: string = "";

  public constructor(public user: UsersService, private router: Router, private social: SocialService) {
    let data = sessionStorage.getItem("user_information");

    if (data) {
      let obj = JSON.parse(data);
      this.user.user_info.name = obj.name;
      this.user.user_info.image = obj.image;
      this.user.user_info.id = obj.id;
    }

    let token = sessionStorage.getItem("token_user");

    if (token != null) {
      this.user.token = token;
    }
  }

  //logout
  logout() {
    if (this.user.token != null) {
      this.user.logout(this.user.token).subscribe(p => {
        if (p.status === 200) {
          sessionStorage.removeItem("token_user");
          sessionStorage.removeItem("user_information");
          this.user.token = '';

          this.router.navigate(['/', 'login'])
        }
      });
    }
  }

  //search user information
  searchUser() {
    //reset array user after search
    this.users = [];
    let token = sessionStorage.getItem("token_user");
    let data = { "name": this.keyword };

    if (token != null) {
      if (this.keyword.length > 0) {
        this.social.searchUser(data, token).subscribe((p: any) => {
          if (p.status === 200) {
            this.users = p.data;
            this.searching = true;
            console.log(p)

          }
        });
      } else {
        this.searching = false;
      }
    }
  }
}
