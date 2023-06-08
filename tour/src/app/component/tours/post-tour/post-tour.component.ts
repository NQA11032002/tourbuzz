import { Component } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { TourService } from 'src/app/services/tour.service';
import { delay } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-tour',
  templateUrl: './post-tour.component.html',
  styleUrls: ['./post-tour.component.scss']
})
export class PostTourComponent {

  public data: Array<any> = new Array<any>();
  public vehicles: Array<any> = new Array<any>();
  title: string = '';
  description: string = '';
  address_start: any;
  address_end: any;
  date_start: Date = new Date();
  date_end: Date = new Date();
  price_tour: number = 0;
  detail_price_tour: string = '';
  amount_customer_maximum: number = 0;
  amount_customer_present: number = 0;
  vehicle_id: number = 0;

  public image: string = "";
  public name: string = "";
  public imageUrl: Array<any> = new Array<any>();
  public imagesUpload: Array<any> = new Array<any>();
  public error: string = "";
  public errorDate: string = "";
  public postFail: string = "";
  postForm: FormGroup;

  public constructor(private address: AddressService, private tour: TourService, private http: HttpClient, private router: Router, private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      address_start: ['', Validators.required],
      address_end: ['', Validators.required],
      date_start: ['', Validators.required],
      date_end: ['', Validators.required],
      price_tour: ['', Validators.required],
      detail_price_tour: ['', Validators.required],
      amount_customer_maximum: ['', Validators.required],
      amount_customer_present: [''],
      vehicle_id: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.getCity();
    this.getVihicle();
  }

  getCity() {
    let token = sessionStorage.getItem('token_user');

    if (token != null) {
      this.address.getCities(token).subscribe(p => {
        this.data = p.data;
      })
    }
  }

  getVihicle() {
    let token = sessionStorage.getItem('token_user');

    if (token != null) {
      this.tour.getVehicle(token).subscribe(p => {
        this.vehicles = p.data;
      })
    }
  }

  submitPostTour() {
    let token = sessionStorage.getItem('token_user');
    let data = {
      "title": this.title,
      "description": this.description,
      "address_start": this.address_start,
      "address_end": this.address_end,
      "date_start": this.date_start,
      "date_end": this.date_end,
      "price_tour": this.price_tour,
      "detail_price_tour": this.detail_price_tour,
      "vehicle_id": this.vehicle_id,
      "amount_customer_maximum": this.amount_customer_maximum,
      "amount_customer_present": this.amount_customer_present,
    }
    if (token != null && this.imagesUpload.length > 0) {
      this.tour.postTour(data, token).subscribe(p => {
        // console.log(p.date_start);
        if (p.status === 200) {
          this.onUpload(p.data);
          this.router.navigate(['/', 'tour']);
        } else {
          if (p.status === '500') {
            this.postFail = "Tạo tour thất bại";
          }
          if (p.date_start != null) {
            this.errorDate = p.date_start;
          }
          if (p.date_end != null) {
            this.errorDate = p.date_end;
          }
          if(p.amount_customer_maximum != null){
            this.error = p.amount_customer_maximum;
          }
        }
      }
      )
    }
  }
  //upload move file into folder source
  onUpload(post: any) {
    this.imagesUpload.forEach(p => {
      //crate formData to upload file
      const formData = new FormData();
      formData.append('file', p);
      formData.append('post', post);

      //create header call api
      const headers = new HttpHeaders();
      headers.set('Content-Type', 'multipart/form-data');

      this.http.post('http://localhost:8000/api/uploadTour', formData, { headers: headers }).subscribe(
        (response) => {
          delay(5000)
          location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    })
  }

  //selected input file, then reader data url of file to element image binding url
  onFileSelected(event: any) {
    const files: FileList = event.target.files;

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
    else {
      this.error = "Chỉ được phép chọn 6 ảnh trong 1 tour";
    }
  }

  //delete a image when create post
  deleteImage(event: any) {
    //get index element choose
    let index = this.imageUrl.indexOf(event);

    //if index different -1 element exists in array perform delete an element from an array
    if (index != -1) {
      this.imageUrl.splice(index, 1);
      this.imagesUpload.splice(index, 1);
    }
  }
}
