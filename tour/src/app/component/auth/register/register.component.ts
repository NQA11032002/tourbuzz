import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public registerFail:string = "";
  registerForm:FormGroup;

  public constructor(private user:UsersService, private fb:FormBuilder, private router:Router){
    this.registerForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      name: ['', Validators.required],
      birth_date: ['', Validators.required],
    })
  }

  submitRegister(){
    let email = this.registerForm.get('email')?.value;
    let password = this.registerForm.get('password')?.value;
    let name = this.registerForm.get('name')?.value;
    let birth_date = this.registerForm.get('birth_date')?.value;

    this.user.register(email, password, name, birth_date).subscribe(p => {

      if(p.status === 200){
        this.router.navigate(['/', 'login']);
      }else
      {
        if(p.email != null){
          this.registerFail = p.email;
        }

        if(p.password != null){
          this.registerFail = p.password;
        }
      }
    })
  }
}
