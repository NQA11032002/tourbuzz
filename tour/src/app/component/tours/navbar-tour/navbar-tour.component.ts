import { Component, OnInit } from '@angular/core';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-navbar-tour',
  templateUrl: './navbar-tour.component.html',
  styleUrls: ['./navbar-tour.component.scss']
}) 
export class NavbarTourComponent implements OnInit {
  public data: Array<any> = new Array<any>();
  public rangeValue: number = 500000;

  public constructor(private address:AddressService){}
  ngOnInit(): void {
    this.getCity();
  }

  getCity(){
    let token = sessionStorage.getItem('token_user');
    
    if(token != null){
      this.address.getCities(token).subscribe(p=>{
        this.data = p.data;
      })
    }
  }

  onRangeValueChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.rangeValue = parseInt(value);
    const priceStart = document.querySelector('.price') as HTMLSpanElement;
    priceStart.innerText = `${this.rangeValue}`;
  }
}
