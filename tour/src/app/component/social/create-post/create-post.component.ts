import { Component } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Posts } from 'src/app/models/Post.model';
import { SocialService } from 'src/app/services/social.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  public addressTravel:Array<any> = new Array<any>();
  public typeTravel:Array<any> = new Array<any>();
  public postForm:FormGroup;
  public image:string = "";
  public name:string = "";

  public constructor(private address:AddressService, private social:SocialService, private fb:FormBuilder){
    this.addressTravels();
    this.typeTravels();

    this.postForm = this.fb.group({
      address_travel_id: ['', ],
      type_travel_id: ['', ],
      title: ['', Validators.required],
      content: ['', Validators.required],
      status: ['', ],
      images: ['', ],
    })

    let user = sessionStorage.getItem("user_information");
    if(user != null)
    {
      let obj = JSON.parse(user);
      this.image = obj.image;
      this.name = obj.name;
    }
  }

  addressTravels(){
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.address.getAddressTravel(token).subscribe(p => {
        this.addressTravel = p.data;
      });
    }
  }

  typeTravels(){
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.address.getTypeTravel(token).subscribe(p => {
        this.typeTravel = p.data;
      });
    }
  }

  createPost(){
    let token = sessionStorage.getItem("token_user");
    let address_travel_id = this.postForm.get('address_travel_id')?.value;
    let type_travel_id = this.postForm.get('type_travel_id')?.value;
    let title = this.postForm.get('title')?.value;
    let content = this.postForm.get('content')?.value;
    let status = this.postForm.get('status')?.value;
    let images = this.postForm.get('images')?.value;

    let post = new Posts(address_travel_id, type_travel_id, title,content,status);

    if(token != null){
      this.social.createPost(post,images,token).subscribe(p => {
        console.log(p);
      });
    }
  }
}
