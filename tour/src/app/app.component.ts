import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'TravelQN';
  id_user: string = "";

  constructor(private router: Router) {
    if(sessionStorage.getItem('token_user') == null)
    {
      this.router.navigate(['/', 'login']);
    }
  }

  ngOnInit() {
    this.getID();
  }

  getID(){
    let id = sessionStorage.getItem("id");
    if(id){
      this.id_user = id;
    }
  }
}
