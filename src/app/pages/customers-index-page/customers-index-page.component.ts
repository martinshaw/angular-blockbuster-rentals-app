import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CustomersService } from '../../services/customers.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CustomerModelType } from '../../app.types';

@Component({
  selector: 'app-customers-index-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    AsyncPipe,
  ],
  templateUrl: './customers-index-page.component.html',
  styleUrl: './customers-index-page.component.scss'
})
export class CustomersIndexPageComponent implements OnInit {
  public displayedColumns = [
    'id',
    'name',
    'email',
    'address',
    'city',
    'region',
    'postal_code',
    'country',
  ]

  public customerRows: CustomerModelType[] = [];

  constructor(
    public customerService: CustomersService,
  ) {
    //
  }

  ngOnInit(): void {
    this.customerService.getAllCustomers$().then((customers) => {
      this.customerRows = customers;
    });
  }
}
