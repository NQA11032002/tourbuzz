import { Component, ElementRef, Input, OnInit,   } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TourService } from 'src/app/services/tour.service';
import { Firestore, collection, addDoc, query, where, orderBy, collectionData, deleteDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-detailstour',
  templateUrl: './detailstour.component.html',
  styleUrls: ['./detailstour.component.scss']
})
export class DetailstourComponent implements OnInit{
  public user_information:any;
  public user_token:any;
  private tour_id:any;
  public lengthComment:any;
  commentGroup:FormGroup;

  constructor(private elementRef: ElementRef, private router: ActivatedRoute, public tour:TourService, private fb:FormBuilder, private firestore: Firestore) {
    this.commentGroup = this.fb.group({
      content: ['', Validators.required]
    })
   }

  ngOnInit(): void {
      const imageContainer = this.elementRef.nativeElement.querySelector('#image-container');
      const images = imageContainer.querySelectorAll('.details_img-item img');
      const numImages = images.length;
      const count=3;

      if (numImages === 1) {
        images[0].style.width = '100%';
        imageContainer.style.display = 'grid';
        imageContainer.style.gridTemplateColumns  = 'auto';
      } else if (numImages === 2) {
        images[0].style.width = '100%';
        images[1].style.width = '100%';
        imageContainer.style.columnGap  = '10px';
        imageContainer.style.display = 'grid';
        imageContainer.style.gridTemplateColumns  = 'auto auto';
      } else if (numImages === 3) {
        images[0].style.width = '100%';
        images[1].style.width = '100%';
        images[2].style.width = '100%';
        imageContainer.style.columnGap  = '10px';
        imageContainer.style.display = 'grid';
        imageContainer.style.gridTemplateColumns  = 'auto auto auto';
      } else if (numImages >= 4) {
        images[0].style.width = '100%';
        images[1].style.width = '100%';
        images[2].style.width = '100%';
        for(let i = 3; i< numImages; i++){
          images[i].style.width = '100%';
        }
        imageContainer.style.columnGap  = '10px';
        imageContainer.style.display = 'grid';
        imageContainer.style.gridTemplateColumns  = 'auto auto auto';
        imageContainer.style.rowGap  = '10px';
      }

      //get query string id tour
      this.router.queryParams.subscribe((params:any) => {
        // Use the params object to access query parameters
        this.tour_id = params.id;
      });

      //set session information
      let user =  sessionStorage.getItem("user_information");
      let token = sessionStorage.getItem("token_user");

      if(user != null)
      {
        let objUser = JSON.parse(user);
        this.user_information = objUser;
      }

      if(token != null){
        this.user_token = token;
      }

      this.getCommentsTour();
      this.getDetail();
    }

    //get detail of the tour
    getDetail(){
      this.tour.getDetail(this.tour_id, this.user_token).subscribe(p => {
        if(p.status === 200){
          this.tour.tour_detail = p.data;
        }
      })
    }

    //comment tour
    commentTour(){
      let content = this.commentGroup.get('content')?.value;
      let today = new Date();

      let data = {"tour_id": this.tour_id, "content" : content, "user" : this.user_information, "created_at":today.toLocaleString()};

      //add comments to firebase
      const collectionInstance = collection(this.firestore, 'comments_tour');
      addDoc(collectionInstance, data).then(() => { })
      .catch((error) => { })

      this.commentGroup.get('content')?.setValue("");
    }

    //get comments of the tour
    getCommentsTour(){
      const collectionInstance = collection(this.firestore, 'comments_tour');
      const q = query(collectionInstance);
      this.tour.tour_comments = collectionData(q, {idField : "id"});

      this.tour.tour_comments.subscribe(p => {
        this.lengthComment = p.length;
      })
    }

    //show more comments of the tour
    moreComments()
    {
      let comments = document.querySelector('.comments_container');
      (comments as HTMLElement).style.height = "auto";

      let more = document.querySelector('.btn_more');
      (more as HTMLElement).style.display = "none";

      let less = document.querySelector('.btn_less');
      (less as HTMLElement).style.display = "block";
    }

    //show less comments of the tour
    lessComments()
    {
      let comments = document.querySelector('.comments_container');
      (comments as HTMLElement).style.height = "300px";

      let more = document.querySelector('.btn_more');
      (more as HTMLElement).style.display = "block";

      let less = document.querySelector('.btn_less');
      (less as HTMLElement).style.display = "none";
    }
}
