import { Component, ElementRef, Input, OnInit,   } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-detailstour',
  templateUrl: './detailstour.component.html',
  styleUrls: ['./detailstour.component.scss']
})
export class DetailstourComponent implements OnInit{
  public user_information:any;
  public user_token:any;
  private tour_id:any;

  constructor(private elementRef: ElementRef, private router: ActivatedRoute, public tour:TourService) { }

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

      this.getDetail();
    }

    getDetail(){
      this.tour.getDetail(this.tour_id, this.user_token).subscribe(p => {
        if(p.status === 200){
          this.tour.tour_detail = p.data;

          console.log(this.tour.tour_detail);
        }
      })
    }
}
