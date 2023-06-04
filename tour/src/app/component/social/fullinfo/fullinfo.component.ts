import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-fullinfo',
  templateUrl: './fullinfo.component.html',
  styleUrls: ['./fullinfo.component.scss']
})
export class FullinfoComponent {
  public data: any = null;
  public id:any;

  constructor(private userinfor : UsersService, private location: Location, private route:ActivatedRoute){
    //get query parameters id of user
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit(): void {
    this.getInfor();
  }

  getInfor(){
    let token = sessionStorage.getItem('token_user');

    if(token != null){
      this.userinfor.getUserInformation(this.id,token).subscribe(p=>{
        this.data = p.data;
        console.log(this.data);
      })
    }
  }

  isProfilePath(): string {
    const path = this.location.path();
    var string = path.split('?');

    return string[0];
  }
}
