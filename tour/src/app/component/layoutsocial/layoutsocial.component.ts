import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Firestore, collection, collectionData, query, orderBy  } from '@angular/fire/firestore';
import { delay } from 'rxjs';

@Component({
  selector: 'app-layoutsocial',
  templateUrl: './layoutsocial.component.html',
  styleUrls: ['./layoutsocial.component.scss']
})
export class LayoutsocialComponent {
  public searchFriend:string = "";

  public friends:Array<any> = new Array<any>();

  constructor(private user:UsersService, private firestore:Firestore){
    this.getFriends();
  }

  //get list friend of the user login
  getFriends(keyword:any = ""){
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      if(keyword !== ""){
        this.user.getFriends(keyword, token).subscribe(p => {
          this.friends = p.data;
        });
      }
      else
      {
        this.user.getFriends("", token).subscribe(p => {
          this.friends = p.data;
        }); 
      }
    }
  }

  //get messenger with friend 
  public messenger(user_id:any){
     let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.user.getUserInformation(user_id,token).subscribe(p => {
          let checkMess = undefined;

          //if messenger is opening, that can't open.
          if(this.user.messenger.length > 0){
            checkMess = this.user.messenger.find(p => p.id === user_id);
          }
          if(checkMess == undefined){
            if(this.user.messenger.length >= 4)
            {
              this.user.messenger.shift();
            }
            
            this.user.messenger.push(p.data);
            this.searchFriend = "";
            this.getFriends();
          }
      });
    
      const collectionInstance = collection(this.firestore, 'messenger');
      const q = query(collectionInstance, orderBy("stt", "asc") );
      this.user.messages = collectionData(q, {idField: 'id'});  
    }
  }
  
  //search list name friend 
  searchFriends(){
    this.getFriends(this.searchFriend);
  }
}
