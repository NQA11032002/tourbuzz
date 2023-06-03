import { Component } from '@angular/core';
import { SocialService } from 'src/app/services/social.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Firestore, collection, addDoc, query, where, orderBy, collectionData, deleteDoc } from '@angular/fire/firestore';
import { doc, getDocs } from 'firebase/firestore';
import { UsersService } from 'src/app/services/users.service';

@Component({

  selector: 'app-post-personal',
  templateUrl: './post-personal.component.html',
  styleUrls: ['./post-personal.component.scss']
})
export class PostPersonalComponent {
  public posts:Array<any> = new Array<any>();
  public comments:Array<any> = new Array<any>();

  public user_id:any;
  public commentForm:FormGroup;
  public status_comment = 0;
  public comment_id = null;
  public info_user:any;
  public post_id_change = null;
  public count = 0;

  constructor(public social:SocialService, private fb:FormBuilder, private firestore: Firestore, private userService:UsersService){
    
    this.commentForm = this.fb.group({
      content: ['', Validators.required],
    })

    let user =  sessionStorage.getItem("user_information");

    if(user != null)
    {
      let objUser = JSON.parse(user);
      this.user_id = objUser;
    }
  }

  ngOnInit() {
    this.getPosts();
    this.getListComments();
    this.getListCommentsReply();

    //refresh api comment and reply comment 5s/1
    // this.setIntervalComment = setInterval(() => {
    //   this.getListComments();
    //   this.getListCommentsReply();
    // }, 3000);
  }

  //get list post
  getPosts(){
    let token = sessionStorage.getItem("token_user");
    let id = sessionStorage.getItem("id");
    let data = {
      'id' : id
    };
    if(token != null){
      this.social.getPostsPersonal(token,data).subscribe(p => {
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
        if(favorites[i].user_id === this.user_id.id){

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
    // let token = sessionStorage.getItem("token_user");
    
    // if(token != null){
    //   this.social.getComments(token).subscribe((p:any) => {
    //     this.comments = p.data;
    //   })
    // }

    const collectionInstance = collection(this.firestore, 'comments');
    const q = query(collectionInstance, orderBy("id", "desc") );
    this.social.comments = collectionData(q, {idField : "id"});

  }


  //get list comment of the post
  getListCommentsReply(){
    // let token = sessionStorage.getItem("token_user");
  
    // if(token != null){
    //   this.social.getCommentsReply(token).subscribe((p:any) => {
    //     this.commentsReply = p.data;
    //   })
    // }

    const collectionInstance = collection(this.firestore, 'comments_reply');
    const q = query(collectionInstance, orderBy("id", "asc") );
    this.social.comments_reply = collectionData(q, {idField : "id"});
  }

  
  //comment the post
  async comment(post:any)
  {
    let token = sessionStorage.getItem("token_user");
    let content = this.commentForm.get('content')?.value;
    let today = new Date();

    if(token != null){
      this.post_id_change = post.id;
      //if status_comment == 0 the user is commenting or status_comment different 0 the user is reply comment
      if(this.status_comment == 0)
      {
        //get length comments of the post
        const collectionInstances = collection(this.firestore, 'comments');
        const q = query(collectionInstances);
        const commentsSnapshot = await getDocs(q);
        let commentsLength = commentsSnapshot.docs.length;

        let data = {"id":commentsLength, "post_id":post.id, "user_id":this.user_id.id, "content":content, "created_at":today.toLocaleString(), "user":this.user_id, "length":commentsLength}

        //add comments to firebase
        const collectionInstance = collection(this.firestore, 'comments');
        addDoc(collectionInstance, data).then(() => { })
        .catch((error) => { })

      
        //insert comment into mysql purpose get total comment of the post
        // this.social.comment(post.id, content, token).subscribe(p => {
        //   if(p.status === 200){
        //     post.post_comments.push(p.data);
        //   }
        // })

        //add comments total of the post to firebase
 

        this.resetComment();
      }
      else
      {
        let index = content.indexOf(':');
        content = content.slice(index + 1);
        console.log(content);
          // this.social.replyComment(this.comment_id, this.info_user.id, content, token).subscribe(p => {
          //   this.commentsReply.push(p.data);

          //   this.status_comment = 0;
          //   this.info_user = null;
          //   this.comment_id = null;
          //   this.commentForm.get('content')?.setValue("");
          // })

        //get length comments_reply of the post
        const collectionInstances = collection(this.firestore, 'comments_reply');
        const q = query(collectionInstances);
        const commentsSnapshot = await getDocs(q);
        let commentsLength = commentsSnapshot.docs.length;

        //get user information reply comment
        // this.getCommentsReply(this.info_user.id);


      this.userService.getUserInformation(this.info_user.id, token).subscribe(p => {
        let data = {"id":commentsLength, "comment_id":this.comment_id, "user_id_1":this.user_id.id, "user_id_2": this.info_user.id, "content":content, "created_at":today.toLocaleString(), "user_1":this.user_id, "user_2":p.data, "length":commentsLength}

        //add comments to firebase
        const collectionInstance = collection(this.firestore, 'comments_reply');
        addDoc(collectionInstance, data).then(() => { })
        .catch((error) => { })

        this.resetComment();
      })
      }
    }
  }


  //The user deletes them comment a post
  deleteComment(id:any, post:any):void{
    // let token = sessionStorage.getItem("token_user");

    // if(token != null){
    //   this.social.deleteComment(id, token).subscribe(p => {
    //     if(p.status === 200){
    //       post.post_comments = this.comments.filter((item:any) => {
    //         return item.id != id;
    //       });
    //     }
    //   })
    // }

    
    const docInstance = doc(this.firestore, 'comments', id);
    deleteDoc(docInstance).then(() => {
      console.log("comment deleted");
    })
  }

  //The user reply comment other user of the post
  replyComment(comment_id:any, user:any, post:any){
    //show name of the user reply comment
      // this.commentForm.get('content')?.setValue("@" + user.name + ": ");
      this.status_comment = 1;
      this.comment_id = comment_id;
      this.info_user = user;

      let inputComment = document.querySelector('.name-input_'+post);
      (inputComment as HTMLElement).style.display = "block";
      (inputComment as HTMLInputElement).value = "@" + user.name + ": ";
      (inputComment as HTMLElement).style.width = (inputComment as HTMLInputElement).value.length + "ch";
      
      inputComment?.addEventListener("keyup", (p) => {
        let value = (p.target as HTMLInputElement).value;
        if(value.length === 0)
        {
          (inputComment as HTMLElement).style.display = "none";
        }
      })
  }

  changeComment(){
    if(this.commentForm.get('content')?.value == "")
    {
      this.status_comment = 0;
    }
  }

  //reset comment
  resetComment(){
    this.status_comment = 0;
    this.commentForm.get('content')?.setValue("");

    let inputComments = document.querySelectorAll('.name-input__comment');

    inputComments.forEach(p => {
      (p as HTMLElement).style.display = "none";
    })
  }


}
