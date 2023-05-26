import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-tour',
  templateUrl: './book-tour.component.html',
  styleUrls: ['./book-tour.component.scss']
})


export class BookTourComponent {
  bookTour: FormGroup;
  public bookFail:string = "";

  public constructor(private user: UsersService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.bookTour = this.fb.group({
      Amount_Crew: ['', Validators.required],
    });
  }

  submitBook() {
    let user_information = sessionStorage.getItem('user_information');

    if (user_information) {
      let user = JSON.parse(user_information);
      let user_id = user.id;
      let amount_customers = this.bookTour.get('AmountCrew')?.value;
      let tour_id = this.route.snapshot.queryParams['id'];
      let status_booking = true;

      this.user.book(user_id, tour_id, amount_customers, status_booking).subscribe(p => {
        if (p.status === 200) {
          this.router.navigate(['/', 'tour']);
        }
        else if (p.status === 404) {
          this.bookFail = "Đăng kí tour thất bại ";
        }
      })
    }
  }
}