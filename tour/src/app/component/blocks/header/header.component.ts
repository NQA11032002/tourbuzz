import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User_InformationModel } from 'src/app/models/User_Information.models';
import { ProfileService } from 'src/app/services/profile.service';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  public user_info:User_InformationModel;
  public data_request: any = null;

  public constructor(private user:UsersService, private router:Router, private profile: ProfileService){
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

  ngOnInit(): void {
    this.getRequestFriend();

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

     // Accept Friend
     acceptFriend(){
      let token = sessionStorage.getItem('token_user');
      let id = sessionStorage.getItem('id');
      for (const item of this.data_request) {
        let data_user_2 = {
          'user_2_id': item.user_1_id,
        }
        console.log(data_user_2);
        if(token != null){
          this.insertAfterAccept();
          this.profile.acceptFriend(token,data_user_2).subscribe(p=>{
            console.log(p);
          })
        }
      }
      console.log(this.data_request);
    }

    insertAfterAccept(){
      let token = sessionStorage.getItem('token_user');
      let id = sessionStorage.getItem('id');
      for (const item of this.data_request) {
        if(token != null){
          this.profile.insertAfterAccept(token,item.user_1_id).subscribe(p=>{
            console.log(token);
          })
        }
      }
    }

    unFriend(){
      let token = sessionStorage.getItem('token_user');
      for (const item of this.data_request) {
        let data_user_2 = {
          'user_2_id': item.user_1_id,
        }
        if(token != null){
          this.profile.unFriend(token,data_user_2).subscribe(p=>{
            console.log(p);
          })
        }
      }
      console.log(this.data_request);
     
    }

    getRequestFriend(){
      let token = sessionStorage.getItem('token_user');
      if(token != null){
        this.profile.friendRequest(token).subscribe(p=>{
          this.data_request = p.data;
        })
      }
    }
}