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
    this.url = this.url.split('/')[2];
  }
}
