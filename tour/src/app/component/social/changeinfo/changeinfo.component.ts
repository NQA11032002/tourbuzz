import { Component } from '@angular/core';

@Component({
  selector: 'app-changeinfo',
  templateUrl: './changeinfo.component.html',
  styleUrls: ['./changeinfo.component.scss']
})
export class ChangeinfoComponent{
  imgInfo!: HTMLImageElement;
  input!: HTMLInputElement;

  constructor() { }

  ngOnInit(): void {
    this.imgInfo = document.getElementById('img_info') as HTMLImageElement;
    this.input = document.getElementById('changed_img') as HTMLInputElement;

    this.input.addEventListener('change', this.onChange.bind(this));
  }

  onChange(e: Event): void {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      this.imgInfo.src = URL.createObjectURL(target.files[0]);
    }
  }
}
