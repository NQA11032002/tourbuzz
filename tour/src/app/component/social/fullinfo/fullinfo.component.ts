import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-fullinfo',
  templateUrl: './fullinfo.component.html',
  styleUrls: ['./fullinfo.component.scss']
})
export class FullinfoComponent {
  public data: any = null;
  public data_friend: any = null;
  public id: string = "";
  public id_user: string = "";

  isOwner: any = null; // Xác định xem người dùng có phải là chủ tài khoản hay không
  isFriend: any = null; // Xác định xem người dùng đã kết bạn hay chưa
  isPending: any = null; // Kiểm tra nếu đang chờ đồng ý

  constructor(private userinfor : UsersService, private location: Location, private route: ActivatedRoute, private router: Router, private profileService: ProfileService) {
  
  }

  ngOnInit(): void {
    this.getInfor();
    this.getID();
    this.checkOwner();
    this.checkFriend();
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
      })
    }
  }

  //Kiem tra duong dan
  isProfilePath(): boolean {
    const regex = /^\/profile(\/\d+)?$/;;
    const path = regex.test(this.router.url);
    if(path)
    return true;
      return false;
  }

  // Kiem tra co phai chu tai khoan hay khong de hien thi "Doi thong tin"
  checkOwner(){
    let id_ss = sessionStorage.getItem("id");
    if(this.id===id_ss){
      this.isOwner = true;
    }  
  }

  // Kiem tra da ket ban hay chua
  checkFriend(){
    let token = sessionStorage.getItem('token_user');
    this.route.paramMap.subscribe(params => {
      let id_user = params.get('id_user');
      if(id_user){
        this.id=id_user;
      }
    });
    let data = {
      'user_2_id': this.id
    }

    if(token != null){
      this.profileService.checkFriend(token, data).subscribe(p=>{
        this.data_friend = p.data;
        console.log(p.data);

        for (const item of this.data_friend) {
          console.log("trang thai 1: "+item.status_user_1);
          console.log("trang thai 2: "+item.status_user_2);
          if(this.data_friend){
            if(item.status_user_1 == 1 && item.status_user_2 == 1){
              this.isFriend = true;
              this.isOwner = false;
            }else if(item.status_user_1 == 1 && item.status_user_2 == 0){
              this.isPending = true;
              this.isOwner = false;
            }
          }else{
            this.isFriend = false;
            this.isOwner = false;
          }
          console.log("La ban:" + this.isFriend);
        console.log("La chu tai khoan:" + this.isOwner);
        console.log("Chua la ban be:" + this.isPending);
        }
        
      })
    }
    

  }

  getID(){
    let id = sessionStorage.getItem("id");
    if(id){
      this.id_user = id;
    }
  }
}
