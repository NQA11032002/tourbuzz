import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-layoutmanagertour',
  templateUrl: './layoutmanagertour.component.html',
  styleUrls: ['./layoutmanagertour.component.scss']
})
export class LayoutmanagertourComponent {
  public url:string = "";

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.url = this.location.path();
    let string = this.url.split('/')[2];
    let index =  string.indexOf('?');

    if(index != -1){
      string = string.substring(0, index);
    }

    this.url = string;
  }
}
