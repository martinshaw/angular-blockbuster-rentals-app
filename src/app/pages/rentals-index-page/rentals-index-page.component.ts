import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RentalModelType } from '../../app.types';
import { RentalsService } from '../../services/rentals.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rentals-index-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    AsyncPipe,
    DatePipe,
  ],
  templateUrl: './rentals-index-page.component.html',
  styleUrl: './rentals-index-page.component.scss'
})
export class RentalsIndexPageComponent implements OnInit {
  public displayedColumns = [
    'id',
    'start_date_at',
    'end_date_at',
    'return_date_at',
    'customer',
    'count_movies',
  ]

  public rentalRows: RentalModelType[] = [];

  constructor(
    public rentalsService: RentalsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    //
  }

  ngOnInit(): void {
    this.rentalsService.getAllRentals$().then((rentals) => {
      this.rentalRows = rentals;
    });
  }

  navigateToRental(rental: RentalModelType) {
    this.router.navigate(['/rentals', rental.id])
  }
}
