import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeinforService } from 'src/app/services/changeinfor.service';
import { UsersService } from 'src/app/services/users.service';
import { delay } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-changeinfo',
  templateUrl: './changeinfo.component.html',
  styleUrls: ['./changeinfo.component.scss']
})
export class ChangeinfoComponent{
  public data:any = null;
  name: string = "";
  gender: string = "";
  phonenumber: string = "";
  date: string = "";
  address: string = "";
  education: string = "";
  changeInforForm:FormGroup;
  imagesUpload:Array<any> = new Array<any>();
  error:any = "";


  imgInfo!: HTMLImageElement;
  input!: HTMLInputElement;

  constructor(private changeinfor:ChangeinforService, private fb:FormBuilder, private userinfor:UsersService, private http: HttpClient, private profile: ProfileService) { 
    this.changeInforForm = this.fb.group({
      name: ['', Validators.required],
      birth_date: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      education: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    this.getInfor();
  }

  // Lay thong tin user de fill vao input
  getInfor(){
    let token = sessionStorage.getItem('token_user');
    let id = sessionStorage.getItem("id");
    
    if(token != null){
      this.userinfor.getUserInformation(id,token).subscribe(p=>{
        this.data = p.data;
        this.changeInforForm.controls['name'].setValue(this.data.name);
        this.changeInforForm.controls['birth_date'].setValue(this.data.birth_date);
        this.changeInforForm.controls['gender'].setValue(this.data.gender);
        this.changeInforForm.controls['address'].setValue(this.data.address);
        this.changeInforForm.controls['phone'].setValue(this.data.phone);
        this.changeInforForm.controls['education'].setValue(this.data.education);
      })
    }
  }

  // Doi thong tin
  changeInfor(){
    let token = sessionStorage.getItem("token_user");
    let id = sessionStorage.getItem("id");
    let data = {
      'name': this.name,
      'birth_date': this.date,
      'gender': this.gender,
      'address': this.address,
      'phone': this.phonenumber,
      'education': this.education
    }
    console.log("Da vao");
    
    if(token != null && id != null){
      this.changeinfor.updateInfor(token,id,data).subscribe(p => {
        if(p.status === 200){
          alert("Cập nhật thông tin thành công!");
          location.reload();
        }else{
          alert("Vui lòng nhập đầy đủ thông tin hoặc đủ kí tự");
        }
      });
    }
  }

  ngOnInit(): void {
    this.imgInfo = document.getElementById('img_info') as HTMLImageElement;
    this.input = document.getElementById('changed_img') as HTMLInputElement;

    this.input.addEventListener('change', this.onChange.bind(this));
  }

  // Chon anh tu file
  onChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      this.imgInfo.src = URL.createObjectURL(target.files[0]);
      // this.onUpload(this.imgInfo.src);
    }
  }

  // onUpload(post:any) {
    // let token = sessionStorage.getItem("token_user");
   
      //crate formData to upload file 
      // const formData = new FormData();
      // formData.append('file', this.imgInfo.src);
      // formData.append('post', post);
      
      //create header call api

      // this.profile.uploadAV(token,)
    //   this.profile.uploadAV(formData), { headers: headers }).subscribe(
    //     (response) => {
    //       delay(5000)
    //       location.reload();
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    // })
}
