import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RentalModelType } from '../../app.types';
import { RentalsService } from '../../services/rentals.service';

@Component({
  selector: 'app-rentals-index-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    AsyncPipe,
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
  ) {
    //
  }

  ngOnInit(): void {
    this.rentalsService.getAllRentals$().then((rentals) => {
      this.rentalRows = rentals;
    });
  }
}
