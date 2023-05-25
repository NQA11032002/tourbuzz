import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{
  public loginFail:string = "";
  loginForm:FormGroup;
  rememberMe: boolean = false;
  Cookieemail: string = "";
  Cookiepassword: string = "";
  @ViewChild('inputemail') inputemail!: ElementRef;
  @ViewChild('inputpassword') inputpassword!: ElementRef;


  public constructor(private user:UsersService, private fb:FormBuilder, private router:Router, private cookie:CookieService, private formBuilder: FormBuilder){
    this.loginForm = this.fb.group({
      email: [this.Cookieemail, Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      remember: [false]
    })
  }

  ngOnInit() {
      this.Cookieemail = this.cookie.get('email');
      this.Cookiepassword = this.cookie.get('password');
  }


  ngAfterViewInit() {
    if(this.Cookieemail){
      this.loginForm.controls['email'].setValue(this.Cookieemail);
      this.loginForm.controls['password'].setValue(this.Cookiepassword);
    }
  }

  cookieLogin(){
    const emailcookie = this.loginForm.get('email')?.value;
    const passwordcookie = this.loginForm.get('password')?.value;
    if(this.loginForm.controls['remember'].value){
      this.cookie.set('email', emailcookie);
      this.cookie.set('password', passwordcookie);
      console.log("Da tich");
    }else{
      console.log("Chua tich");
    }
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
        let id = p.id;
        let data = {"id":p.data.id, "name":p.data.name, "birth_date":p.data.birth_date, "gender":p.data.gender, "address":p.data.address, "phone":p.data.phone, "education":p.data.education, "image":p.data.image};
        this.cookieLogin();
        
        if(token)
        {
          sessionStorage.setItem('token_user', token);
          sessionStorage.setItem('user_information', JSON.stringify(data));
          sessionStorage.setItem('id_user', id);
        }

        this.router.navigate(['/', 'home'])
      }
    })
  }
}
