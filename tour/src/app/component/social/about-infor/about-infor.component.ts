import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about-infor',
  templateUrl: './about-infor.component.html',
  styleUrls: ['./about-infor.component.scss']
})
export class AboutInforComponent {
  public id: string = "";
  public data: any = null;
  constructor(private userinfor : UsersService, private route: ActivatedRoute){
  }

  ngOnInit(): void {
    this.getInfor();
  }

  getInfor(){
    let token = sessionStorage.getItem('token_user');
    this.route.paramMap.subscribe(params => {
      let id_user = params.get('id_user');
      if(id_user){
        this.id=id_user;
      }
    });
    console.log(this.id);
    
    if(token != null){
      this.userinfor.getUserInformation(this.id,token).subscribe(p=>{
        this.data = p.data;
        console.log(this.data);
      })
    }
  }
}
