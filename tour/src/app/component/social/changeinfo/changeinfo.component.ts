import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ChangeinforService } from 'src/app/services/changeinfor.service';
@Component({
  selector: 'app-changeinfo',
  templateUrl: './changeinfo.component.html',
  styleUrls: ['./changeinfo.component.scss']
})
export class ChangeinfoComponent{
  imgInfo!: HTMLImageElement;
  input!: HTMLInputElement;
  changeInforForm:FormGroup;

  constructor(private fb:FormBuilder, private changeinfor:ChangeinforService) { 
    this.changeInforForm = new FormGroup({
      name: new FormControl(''),
      birth_date: new FormControl(''),
      phone: new FormControl(''),
      gender: new FormControl(''),
      education: new FormControl(''),
      address: new FormControl('')
    });
  }

  changeInfor(){
    let token = sessionStorage.getItem("token_user");
    let id_user = sessionStorage.getItem("id_user");

    let name = this.changeInforForm.get('name')?.value;
    let birth_date = this.changeInforForm.get('birth_date')?.value;
    let gender = this.changeInforForm.get('gender')?.value;
    let address = this.changeInforForm.get('address')?.value;
    let phone = this.changeInforForm.get('phone')?.value;
    let education = this.changeInforForm.get('education')?.value;
    let data = {
      name: name,
      birth_date: birth_date,
      gender: gender,
      address: address,
      phone: phone,
      education: education
    }
    
    if(token != null && id_user != null){
      this.changeinfor.updateInfor(token,"18",data).subscribe(p => {
        
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
