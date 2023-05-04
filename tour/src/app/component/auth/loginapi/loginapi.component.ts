import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
@Component({
  selector: 'app-loginapi',
  templateUrl: './loginapi.component.html',
  styleUrls: ['./loginapi.component.scss'],
})
export   class LoginapiComponent implements OnInit{
  public  email: string="" ;
  public password: string="";

  constructor(private authService: AuthServiceService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.email, this.password).subscribe(
      response => {
        localStorage.setItem('token', response.access_token);
        console.log(this.email+"-"+this.password);
      },
      error => {
        console.log(error);
      }
    );
  }
}
