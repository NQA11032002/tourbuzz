import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent {
  public token:string = "";
  public userLogin:any;
  formSendMessage:FormGroup;

  constructor(public user:UsersService, private fb:FormBuilder ){
    let userLogin = sessionStorage.getItem("user_information");

    if(userLogin != null){
      this.userLogin = JSON.parse(userLogin);
    }

    this.formSendMessage = this.fb.group({
      message: ['', Validators.required],
    });

    let token = sessionStorage.getItem("token_user");
    if(token)
    {
      this.token = token;
    }
  }

  //close messenger
  closeMessenger(friend_id:any){
    this.user.messenger = this.user.messenger.filter((p) => {
      return p.friend.id !== friend_id;
    });
  }

  //send message to friend
  sendMessenger(friend_id:any){
    let message = this.formSendMessage.get('message')?.value;

    if(this.token != null){
      //send request message to sever
      this.user.sendMessenger(friend_id, message, this.token).subscribe(p => {
        //get new message after send message
        this.user.getMessenger(friend_id, this.token).subscribe(obj => {
          //update message
          let messUpdate = this.user.messenger.find(message => message.friend.id === friend_id)
          messUpdate.data = obj.data;
        })
      })

      //delete message after send
      this.resetMessage();
    }
  }

  resetMessage(){
    this.formSendMessage.get('message')?.setValue("");
  }
}
