import { Component, ElementRef, Input, OnInit,   } from '@angular/core';

@Component({
  selector: 'app-detailstour',
  templateUrl: './detailstour.component.html',
  styleUrls: ['./detailstour.component.scss']
})
export class DetailstourComponent implements OnInit{
  constructor(private elementRef: ElementRef) { }

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
  }
}
