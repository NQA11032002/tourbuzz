import { Component } from '@angular/core';
import { Cities } from 'src/app/models/Cities.models';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public data:Array<any> = new Array<any>();

  public constructor(private address:AddressService){
    this.getCities();
  }

  getCities(){
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.address.getCities(token).subscribe(p => {
        this.data = p.data;

        console.log(this.data[0]);
      });
    }

  }
}
