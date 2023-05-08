import { Component } from '@angular/core';
import { SocialService } from 'src/app/services/social.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  public posts:Array<any> = new Array<any>();
  public user_id = "";

  constructor(private social:SocialService){
    this.getPosts();
  }

  //get list post
  getPosts(){
    let token = sessionStorage.getItem("token_user");
    let user =  sessionStorage.getItem("user_information");

    if(user != null)
    {
      let objUser = JSON.parse(user);
      this.user_id = objUser.id;
    }

    if(token != null){
      this.social.getPosts(token).subscribe(p => {
        this.posts = p.data;
      });
    }
  }
  
  //post is favorite by user
  isFavorite(favorites:any) : boolean {
    
    if(favorites.length > 0)
    {
      //post favorite by user is return true
      for(let i = 0; i < favorites.length; i++){
        if(favorites[i].user_id === this.user_id){

          return true;
        }  
      }
    }

    return false;
  }

  //favorite the post
  favorite(post:any){
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.social.favorite(post.id,token).subscribe(p => {

        //filter list item post
        this.posts.filter(item => {

          //get item post has id = post like or unlike 
          if(item.id == post.id)
          {
            //if status check of response api return = "like" post is favorite, or check = "unlike" post is remove out list post_favorite
            if(p.check == "like")
            {
              return item.post_favorite.push(p.data);
            }else
            {
              return item.post_favorite = p.data;
            }
          }
        });
      })
    }
  }
}
