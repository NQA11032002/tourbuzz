import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Tours } from 'src/app/models/Tours.model';
import { AddressService } from 'src/app/services/address.service';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-edit-tour',
  templateUrl: './edit-tour.component.html',
  styleUrls: ['./edit-tour.component.scss']
})
export class EditTourComponent {
  public cities: Array<any> = new Array<any>();
  public vehicles: Array<any> = new Array<any>();

  public imageUrl:Array<any> = new Array<any>();
  public imagesUpload:Array<any> = new Array<any>();
  public error:string = "";
  public tour_id:number = 0;
  public tourModel:any;

  public constructor( private address:AddressService,private tour:TourService,private http: HttpClient,private router:Router, private route:ActivatedRoute){}

  ngOnInit(): void {
    this.getCity();
    this.getVihicle();

    this.route.queryParams.subscribe((p : any)=> {
      this.tour_id = p.id;
    })

    this.getTour();
  }

  getCity(){
    let token = sessionStorage.getItem('token_user');

    if(token != null){
      this.address.getCities(token).subscribe(p=>{
        this.cities = p.data;
      })
    }
  }

  getVihicle(){
    let token = sessionStorage.getItem('token_user');

    if(token != null){
      this.tour.getVehicle(token).subscribe(p=>{
        this.vehicles = p.data;
      })
    }
  }

  //get tour edit
  getTour(){
    let token = sessionStorage.getItem('token_user');
    let data = {"id" : this.tour_id};

    if(token != null){
      this.tour.getTours(data, token).subscribe(p=>{
        this.tourModel = p.data[0];

      })
    }
  }

  //submit update post tour
  submitPostTour(){
    let token = sessionStorage.getItem('token_user');
    this.deletePicture();

    if(token != null && this.imagesUpload.length > 0){
      this.tour.updateTour(this.tour_id, this.tourModel, token).subscribe(p=>{
        if(p.status == 200){
          this.onUpload(p.data);
        }
      })
    }
  }

  //delete picture of the tour
  deletePicture(){
    let token = sessionStorage.getItem('token_user');

    if(token != null){
      this.tour.deletePicture(this.tour_id, token).subscribe(p => {
      })
    }
  }

  //upload move file into folder source
  onUpload(post:any) {
    this.imagesUpload.forEach(p => {
      //crate formData to upload file
      const formData = new FormData();
      formData.append('file', p);
      formData.append('post', post.id);

      //create header call api
      const headers = new HttpHeaders();
      headers.set('Content-Type', 'multipart/form-data');

      this.http.post('http://localhost:8000/api/uploadTour', formData, { headers: headers }).subscribe(
        (response) => {
        },
        (error) => {
        }
      );
    })
  }

  //selected input file, then reader data url of file to element image binding url
  onFileSelected(event:any){
    const files:FileList  = event.target.files;

    //limit image choose 3
    if (files.length > 0 && files.length <= 6) {
      //clear arr
      this.imageUrl.splice(0, files.length);
      this.imagesUpload.splice(0, files.length);

      for (let i = 0; i < files.length; i++) {
        //images upload
        this.imagesUpload.push(files[i]);

        //read data file selected
        const reader = new FileReader();
        reader.readAsDataURL(files[i]);
        reader.onload = () => {
          this.imageUrl.push(reader.result as string);
        };
      }

      this.error = "";
    }
    else
    {
      this.error = "Chỉ được phép chọn 6 ảnh trong 1 tour";
    }
  }

  //delete a image when create post
  deleteImage(event:any){
    //get index element choose
    let index = this.imageUrl.indexOf(event);

    //if index different -1 element exists in array perform delete an element from an array
    if(index != -1){
      this.imageUrl.splice(index, 1);
      this.imagesUpload.splice(index,1);
    }
  }
}
