import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public email:string = "";
  public password:string = "";

  public constructor(private user:UsersService){

  }

  submitLogin(){
    this.user.login(this.email, this.password).subscribe(p => {
      let token = p.token;
      sessionStorage.setItem('token_user', token);

      //get token
      //sessionStorage.getItem('token_user);
    })
  }
}
