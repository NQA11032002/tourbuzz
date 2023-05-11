import { Component} from '@angular/core';
import { SocialService } from 'src/app/services/social.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comments } from 'src/app/models/Comments.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent{
  public posts:Array<any> = new Array<any>();
  public comments:Array<any> = new Array<any>();
  public commentsReply:Array<any> = new Array<any>();

  public user_id = "";
  public commentForm:FormGroup;
  public status_comment = 0;
  public comment_id = null;
  public info_user:any;
  public post_id_change = null;
  public setIntervalComment:any = undefined;

  constructor(private social:SocialService, private fb:FormBuilder){
    
    this.commentForm = this.fb.group({
      content: ['', Validators.required],
    })
  }

  ngOnInit() {
    this.getPosts();
    this.getListComments();
    this.getListCommentsReply();

    //refresh api comment and reply comment 5s/1
    this.setIntervalComment = setInterval(() => {
      this.getListComments();
      this.getListCommentsReply();
    }, 3000);
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

  //get list comment of the post
  getListComments(){
    let token = sessionStorage.getItem("token_user");
    
    if(token != null){
      this.social.getComments(token).subscribe((p:any) => {
        this.comments = p.data;
      })
    }
  }

  //get Comment of the post
  getComments(post_id:any){
    let comments = this.comments.filter((p:Comments) => {
      return p.post_id == post_id;
    })
    
    return comments;
  }

  //get list comment of the post
  getListCommentsReply(){
    let token = sessionStorage.getItem("token_user");
  
    if(token != null){
      this.social.getCommentsReply(token).subscribe((p:any) => {
        this.commentsReply = p.data;
      })
    }
  }

  //get Comment reply of the comment
  getCommentsReply(comment_id:any){
    let comments = this.commentsReply.filter((p:any) => {
      return p.comment_id == comment_id;
    })
      
    return comments;
  }

  //comment the post
  comment(item:any)
  {
    let token = sessionStorage.getItem("token_user");
    let content = this.commentForm.get('content')?.value;

    if(token != null){
      this.post_id_change = item.id;
      //if status_comment == 0 the user is commenting or status_comment different 0 the user is reply comment
      if(this.status_comment == 0)
      {
        this.social.comment(item.id, content, token).subscribe(p => {
          if(p.status === 200){
            item.post_comments.push(p.data);
            this.comments.push(p.data);
            this.commentForm.get('content')?.setValue("");
          }
        })
      }
      else
      {
        let index = content.indexOf(':');
        content = content.slice(index + 2);

          this.social.replyComment(this.comment_id, this.info_user.id, content, token).subscribe(p => {
            this.commentsReply.push(p.data);

            this.status_comment = 0;
            this.info_user = null;
            this.comment_id = null;
            this.commentForm.get('content')?.setValue("");
          })
      }
    }
  }

  //The user deletes them comment a post
  deleteComment(comment:any):void{
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.social.deleteComment(comment.id, token).subscribe(p => {
        if(p.status === 200){
          this.comments = this.comments.filter((item:any) => {
            return item.id != comment.id;
          });
        }
      })
    }
  }

  //The user reply comment other user of the post
  replyComment(comment_id:any, user:any){
    //show name of the user reply comment
    this.commentForm.get('content')?.setValue("@" + user.name + ": ");
    this.status_comment = 1;
    this.comment_id = comment_id;
    this.info_user = user;
  }
}
