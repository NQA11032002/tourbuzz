import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TourService } from 'src/app/services/tour.service';

@Component({
  selector: 'app-book-tour',
  templateUrl: './book-tour.component.html',
  styleUrls: ['./book-tour.component.scss']
})


export class BookTourComponent {
  bookingTour:FormGroup;
  private tour_id:any;
  private user_token:any;
  private pay_id:any = 1;

  constructor(private fb:FormBuilder, private router: ActivatedRoute, public tour:TourService){
    this.bookingTour = this.fb.group({
      user_name: ['', Validators.required],
      phone: ['', Validators.required],
      amount_crew: ['', Validators.required],
      description: [''],
      email: ['']
    })
  }

  ngOnInit(){
    let token = sessionStorage.getItem("token_user");

    if(token != null){
      this.user_token = token;
    }

    this.getCategoriesPay()
  }

  //get list category pay
  getCategoriesPay(){
    this.tour.getCategoriesPay(this.user_token).subscribe(p => {
      if(p.status == 200)
      {
        this.tour.categoryPay = p.data
      }
    })
  }

  //booking tour
  submitBookingTour(){
    let user_name = this.bookingTour.get('user_name')?.value;
    let phone = this.bookingTour.get('phone')?.value;
    let email = this.bookingTour.get('email')?.value;
    let amount_crew = this.bookingTour.get('amount_crew')?.value;
    let description = this.bookingTour.get('description')?.value;

    //get query string id tour
    this.router.queryParams.subscribe((params:any) => {
        // Use the params object to access query parameters
        this.tour_id = params.id;
    });

    let data = {"user_name": user_name, "phone": phone, "email": email, "amount_crew": amount_crew, "description": description, "tour_id": this.tour_id, "category_pay_id" : this.pay_id};

    this.tour.bookingTour(data, this.user_token).subscribe(p => {
      if(p.status === 200){
        (document.querySelector('#cb_notify') as HTMLElement).setAttribute("checked", "true");

        this.bookingTour.get('user_name')?.setValue("");
        this.bookingTour.get('phone')?.setValue("");
        this.bookingTour.get('email')?.setValue("");
        this.bookingTour.get('amount_crew')?.setValue("");
        this.bookingTour.get('description')?.setValue("");
      }
    })
  }

  onSelectPayChange(event:any){
    let value = event.target.value;
    this.pay_id = value;
  }

  closeNotify(){
    location.reload();
  }
}
