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
  public data_infor: any = null;
  public data_friend: any = null;
  public id: string = "";
  public id_user: string = "";
  public id_params: any;

  isOwner: any = null; // Xác định xem người dùng có phải là chủ tài khoản hay không
  isFriend: any = null; // Xác định xem người dùng đã kết bạn hay chưa
  isPending: any = null; // Kiểm tra nếu đang chờ đồng ý

  constructor(private userinfor : UsersService, private location: Location, private route: ActivatedRoute, private router: Router, private profileService: ProfileService) {
    this.route.queryParams.subscribe(params => {
      this.id_params = params['id'];
    });
  }

  ngOnInit(): void {
    this.getInfor();
    this.checkOwner();
    this.checkFriend();
  }

  getInfor(){
    let token = sessionStorage.getItem('token_user');
    console.log(this.id_params);
    if(token != null){
      this.userinfor.getUserInformation(this.id_params,token).subscribe(p=>{
        this.data_infor = p.data;
        console.log(this.data_infor);
      })
    }
    
  }

  // Kiem tra co phai chu tai khoan hay khong de hien thi "Doi thong tin"
  checkOwner(){
    let id_ss = sessionStorage.getItem("id");
    if(this.id_params===id_ss){
      this.isOwner = true;
    }  
  }

  // Kiem tra da ket ban hay chua
  checkFriend(){
    let token = sessionStorage.getItem('token_user');
    let data_user_id = {
      'user_2_id': this.id_params
    }
    console.log(data_user_id);
    if(token != null){
      this.profileService.checkFriend(token, data_user_id).subscribe(p=>{
        this.data_friend = p.data;
        // console.log(p.data);

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

  isProfilePath(): string {
    const path = this.location.path();
    var string = path.split('?');

    return string[0];
  }
}
