import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Component } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent {
  public token:string = "";
  public userLogin:any;
  formSendMessage:FormGroup;

  constructor(public user:UsersService, private fb:FormBuilder, private firestore: Firestore ){
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
      return p.id !== friend_id;
    });
  }

  //send message to friend
  sendMessenger(friend_id:any){
    let message = this.formSendMessage.get('message')?.value;
    let user_1_id = this.userLogin.id;
    let today = new Date();

    if(this.token != null){
      //send request message to sever
      let messenger = {"user_1_id":user_1_id, "user_2_id":friend_id, "chat_user":message, "created_at":today.toLocaleString()}

      //add message to firebase
      const collectionInstance = collection(this.firestore, 'messenger');
      addDoc(collectionInstance, messenger).then(() => { })
      .catch((error) => { })

      //delete message after send
      this.resetMessage();
    }
  }

  //reset message
  resetMessage(){
    this.formSendMessage.get('message')?.setValue("");
  }
}
