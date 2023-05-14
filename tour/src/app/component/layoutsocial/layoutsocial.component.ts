import { Component, EventEmitter, Output } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-layoutsocial',
  templateUrl: './layoutsocial.component.html',
  styleUrls: ['./layoutsocial.component.scss']
})
export class LayoutsocialComponent {

  public friends:Array<any> = new Array<any>();

  constructor(private user:UsersService){
    this.getFriends();
  }

  //get list friend of the user login
  getFriends(){
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.user.getFriends(token).subscribe(p => {
        this.friends = p.data;
      });
    }
  }

  //get messenger with friend 
  messenger(user_id:any){
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.user.getMessenger(user_id,token).subscribe(p => {
        if(p.status == 200){
          const data = p.data;
          const messengers = document.querySelector('.messengers');
          let check_messenger = document.querySelector('.messenger_' + user_id);
          if(!check_messenger)
          {
            let messenger = `<div class="messenger_header messenger_`+user_id+` d-flex justify-content-between">
                                <div class="messenger_left d-flex">
                                    <img class="messenger_avatar" src="assets/images/avatar/`+data[0].user_information.image+`" alt="">
                                    <div class="messenger_info">
                                      <h6 class="messenger_name">`+data[0].user_information.name+`</h6>`;

                                      if(data[0].user_information.is_login === 1)
                                      {
                                        messenger += `<p class="messenger_status">Đang hoạt động</p>`
                                      }else
                                      {
                                        messenger += `<p class="messenger_status">Người dùng hiện không có mặt</p>`
                                      }

                                  messenger += `</div>
                                </div>
                                <div class="messenger_window d-flex">
                                  <i class="fa-solid fa-xmark close_messenger close_mess_`+data[0].id+`"></i>
                                </div>
                              </div>
                            <div class="messenger_content d-flex flex-column">`;

          data.forEach((element:any) => {
            messenger += `<div>`;
                          if(element.chat_user_2)
                          {
                            messenger += `<div class="messenger_user_2 d-flex align-items-center">
                                            <img class="messenger_user_2--avatar" src="assets/images/avatar/`+data[0].user_information.image+`" alt="">
                                            <p class="messenger_user_2--content">`+element.chat_user_2+`</p>
                                          </div>`;
                          }

                          if(element.chat_user_1)
                          {
                            messenger += `<div class="messenger_user_1">
                                            <p class="messenger_user_1--content">`+element.chat_user_1+`</p>
                                          </div>`;
                          }

                          messenger += `</div>`;
          });

          messenger += `</div>     
                        <div class="messenger_insert">
                          <form action="" class="form-control form_messenger d-flex justify-content-between">
                            <input type="text" class="messenger_input shadow-none w-100" placeholder="Nhập tin nhắn bạn muốn gửi">
                      
                            <button type="submit" class="messenger_submit">
                              <i class="fa-regular fa-paper-plane"></i>
                            </button>
                          </form>
                    </div>`;

            let html = document.createElement('div');
            html.classList.add('messenger');
            html.innerHTML = messenger;

            html.children[0].children[1].addEventListener("click", (event) => {
              let messenger = (event.target as HTMLElement).parentNode?.parentNode?.parentNode;
              if(messenger)
              {
                messengers?.removeChild(messenger);
              }
            })

            messengers?.appendChild(html);
          }
        }
      });
    }
  }
}
