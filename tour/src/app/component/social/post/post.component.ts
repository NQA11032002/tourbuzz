import { Component } from '@angular/core';
import { SocialService } from 'src/app/services/social.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  public posts:Array<any> = new Array<any>();

  constructor(private social:SocialService){
    this.getPosts();
  }

  getPosts(){
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.social.getPosts(token).subscribe(p => {
        this.posts = p.data;
      });
    }
  }
}
