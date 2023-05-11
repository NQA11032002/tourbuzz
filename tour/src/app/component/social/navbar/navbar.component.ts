import { UsersService } from 'src/app/services/users.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public friends:Array<any> = new Array<any>();
  public messengers:Array<any> = new Array<any>();

  constructor(private user:UsersService){
    this.getFriends();
  }

  //get list friend of the user login
  getFriends(){
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.user.getFriends(token).subscribe(p => {
        this.friends = p.data;
      });
    }
  }

  //get messenger with friend 
  messenger(user_id:any){
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.user.getMessenger(user_id,token).subscribe(p => {
        this.messengers = p;
      });
    }
  }
}
