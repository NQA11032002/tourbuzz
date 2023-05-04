import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/Service/api-service.service';

@Component({
  selector: 'app-navbar-tour',
  templateUrl: './navbar-tour.component.html',
  styleUrls: ['./navbar-tour.component.scss']
}) 
export class NavbarTourComponent implements OnInit{
  
  constructor(private apiService: ApiServiceService){}
  ngOnInit(): void {
      this.apiService.getCity().subscribe((data)=>{
        console.log("city", data);  
      })
  }
}
