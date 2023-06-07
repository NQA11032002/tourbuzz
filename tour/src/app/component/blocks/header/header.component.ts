import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User_InformationModel } from 'src/app/models/User_Information.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  public user_info:User_InformationModel;

  public constructor(private user:UsersService, private router:Router){
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

  logout(){
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.user.logout(token).subscribe(p => {
        console.log(p);
        if(p.status === 200){
          sessionStorage.removeItem("token_user");
          sessionStorage.removeItem("user_information");

          this.router.navigate(['/', 'login'])
        }
      });
    }
  }
}