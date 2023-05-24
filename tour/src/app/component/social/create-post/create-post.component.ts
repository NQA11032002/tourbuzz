import { Component } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Posts } from 'src/app/models/Post.model';
import { SocialService } from 'src/app/services/social.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { delay } from 'rxjs/operators';

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
  public imageUrl:Array<any> = new Array<any>();
  public imagesUpload:Array<any> = new Array<any>();
  public error:string = "";

  public constructor(private address:AddressService, private social:SocialService, private fb:FormBuilder, private http: HttpClient){
    this.addressTravels();
    this.typeTravels();

    this.postForm = this.fb.group({
      address_travel_id: ['', Validators.required],
      type_travel_id: ['', Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required],
      status: ['', Validators.required],
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

  /*
    step 1: write title, content and chooses image, status...
    step 2: create content of post save to database
    step 3: upload image of post save to folder source code and url into database
   */
  
  //selected input file, then reader data url of file to element image binding url
  onFileSelected(event:any){
    const files:FileList  = event.target.files;
    
    //limit image choose 3
    if (files.length > 0 && files.length <= 3) {     
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
      this.error = "Chỉ được phép chọn 3 ảnh trong 1 bài viết";
    }
  }

  //creat post
  createPost(){
    let token = sessionStorage.getItem("token_user");
    let address_travel_id = this.postForm.get('address_travel_id')?.value;
    let type_travel_id = this.postForm.get('type_travel_id')?.value;
    let title = this.postForm.get('title')?.value;
    let content = this.postForm.get('content')?.value;
    let status = this.postForm.get('status')?.value;

    let post = new Posts(address_travel_id, type_travel_id, title,content,status);

    if(token != null){
      this.social.createPost(post,token).subscribe(p => {
        if(this.imagesUpload.length > 0){
          this.onUpload(p.data);
        }
        else
        {
          location.reload();
        }
      });
    }

  }

  //upload move file into folder source
  onUpload(post:any) {
    this.imagesUpload.forEach(p => {
      //crate formData to upload file 
      const formData = new FormData();
      formData.append('file', p);
      formData.append('post', post);
      
      //create header call api
      const headers = new HttpHeaders();
      headers.set('Content-Type', 'multipart/form-data');
    
      this.http.post('http://localhost:8000/api/upload', formData, { headers: headers }).subscribe(
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

