import { Component} from '@angular/core';
import { ChangeinforService } from 'src/app/services/changeinfor.service';
@Component({
  selector: 'app-changeinfo',
  templateUrl: './changeinfo.component.html',
  styleUrls: ['./changeinfo.component.scss']
})
export class ChangeinfoComponent{

  name: string = "";
  gender: string = "";
  phonenumber: string = "";
  date: string = "";
  address: string = "";
  education: string = "";

  imgInfo!: HTMLImageElement;
  input!: HTMLInputElement;

  constructor(private changeinfor:ChangeinforService) { 
    
  }

  changeInfor(){
    let token = sessionStorage.getItem("token_user");
    let id = sessionStorage.getItem("id");
    console.log(id);

    let data = {
      'name': this.name,
      'birth_date': this.date,
      'gender': this.gender,
      'address': this.address,
      'phone': this.phonenumber,
      'education': this.education
    }
    
    if(token != null && id != null){
      this.changeinfor.updateInfor(token,id,data).subscribe(p => {
        console.log(p);
        if(p.status === 200){
          alert("Cập nhật thông tin thành công!");
        }else{
          alert("Vui lòng nhập đầy đủ thông tin hoặc đủ kí tự");
        }
      });
    }
  }

  saveChange(){
    this.changeInfor();
  }

  ngOnInit(): void {
    this.imgInfo = document.getElementById('img_info') as HTMLImageElement;
    this.input = document.getElementById('changed_img') as HTMLInputElement;

    this.input.addEventListener('change', this.onChange.bind(this));
  }

  onChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      this.imgInfo.src = URL.createObjectURL(target.files[0]);
    }
  }
}
