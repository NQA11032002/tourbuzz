import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-layoutsocial',
  templateUrl: './layoutsocial.component.html',
  styleUrls: ['./layoutsocial.component.scss']
})
export class LayoutsocialComponent {

  public friends:Array<any> = new Array<any>();

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
  public messenger(user_id:any){
     let token = sessionStorage.getItem("token_user");
    if(token != null){
      this.user.getMessenger(user_id,token).subscribe(p => {
          let checkMess = undefined;

          //if messenger is opening, that can't open.
          if(this.user.messenger.length > 0){
            checkMess = this.user.messenger.find(p => p.friend.id === user_id);
          }

          if(checkMess == undefined){
            this.user.messenger.push(p);
          }
      });
    }
  }

}
