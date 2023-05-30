import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-fullinfo',
  templateUrl: './fullinfo.component.html',
  styleUrls: ['./fullinfo.component.scss']
})
export class FullinfoComponent {
  public data: any = null;
  constructor(private userinfor : UsersService, private location: Location){
  
  }

  ngOnInit(): void {
    this.getInfor();
  }
  getInfor(){
    let token = sessionStorage.getItem('token_user');
    let id = sessionStorage.getItem("id");
    
    if(token != null){
      this.userinfor.getUserInformation(id,token).subscribe(p=>{
        this.data = p.data;
        console.log(this.data);
      })
    }
  }

  isProfilePath(): boolean {
    const path = this.location.path();
    console.log(path);
    if(path === '/profile')
    return true;
      return false;
  }
}
