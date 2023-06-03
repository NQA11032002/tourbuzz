import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  public name:string = "";
  public image:string = "";
  public id_user: string = "";

  public constructor(private user:UsersService, private router:Router){
    let data = sessionStorage.getItem("user_information");

    if(data)
    {
      let obj = JSON.parse(data);

      this.name = obj.name;
      this.image = obj.image;
    }
  }

  ngOnInit() {
    this.getID();
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

  getID(){
    let id = sessionStorage.getItem("id");
    if(id){
      this.id_user = id;
    }
  }
}
