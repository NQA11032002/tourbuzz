import { Component } from '@angular/core';
import { ChangeinforService } from 'src/app/services/changeinfor.service';

@Component({
  selector: 'app-resetpass',
  templateUrl: './resetpass.component.html',
  styleUrls: ['./resetpass.component.scss']
})
export class ResetpassComponent {
  password: string = "";
  newpass: string = "";
  renewpass: string = "";

  constructor(private changepassword:ChangeinforService) { 
    
  }

  changePassword(){
    let token = sessionStorage.getItem("token_user");

    let data = {
      'old_password': this.password,
      'new_password': this.newpass,
      'confirm_password': this.renewpass,
    }

    if(token != null){
      this.changepassword.updatePassword(token,data).subscribe(p => {
        console.log(p);
        if(p.status === 200){
          alert("Đổi mật khẩu thành công!");
        }else{
          alert("Đổi mật khẩu thất bại");
        }
      });
    }
    

  }
}
