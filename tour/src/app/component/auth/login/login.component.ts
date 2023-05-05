import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  public loginFail:string = "";
  loginForm:FormGroup;

  public constructor(private user:UsersService, private fb:FormBuilder, private router:Router){
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  submitLogin(){
    this.user.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).subscribe(p => {

      if(p.status === 401)
      {
        this.loginFail = "Tài khoản hoặc mật khẩu không chính xác";
      }
      else if(p.status === 200)
      {
        let token = p.token;
        let data = {"id":p.data.id, "name":p.data.name, "birth_date":p.data.birth_date, "gender":p.data.gender, "address":p.data.address, "phone":p.data.phone, "education":p.data.education, "image":p.data.image};

        if(token)
        {
          sessionStorage.setItem('token_user', token);
          sessionStorage.setItem('user_information', JSON.stringify(data));
        }

        this.router.navigate(['/', 'home'])
      }
    })
  }
}
