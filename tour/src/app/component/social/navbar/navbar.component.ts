import { UsersService } from 'src/app/services/users.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public friends:Array<any> = new Array<any>();

  constructor(private user:UsersService){
    this.getFriends();
  }

  getFriends(){
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.user.getFriends(token).subscribe(p => {
        this.friends = p.data.data;
        console.log(this.friends);
      });
    }
  }
}
