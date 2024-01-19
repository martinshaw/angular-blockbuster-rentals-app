import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { RentalCreationSidebarFormService } from '../../../../services/rental-creation-sidebar-form.service';
import { MiniMovieListComponent } from '../../../../components/mini-movie-list/mini-movie-list.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomerModelType, MovieRentalPriceModelType } from '../../../../app.types';
import { CustomersService } from '../../../../services/customers.service';


@Component({
  selector: 'app-rental-creation-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatSidenavModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MiniMovieListComponent,
    AsyncPipe,
    CurrencyPipe,
  ],
  templateUrl: './rental-creation-sidebar.component.html',
  styleUrl: './rental-creation-sidebar.component.scss'
})
export class RentalCreationSidebarComponent implements OnInit {
  customerFormControl = new FormControl<string | null>(null);
  customerOptions: CustomerModelType[] = [];

  rentalPeriodFormControl = new FormControl<MovieRentalPriceModelType['period']>('1 day');
  rentalPeriodOptions: MovieRentalPriceModelType['period'][] = [
    '1 day',
    '2 days',
    '3 days',
    '1 week',
    '2 weeks',
    '3 weeks',
    '1 month',
    '2 months',
    '3 months',
  ];

  constructor(
    public customerService: CustomersService,
    public rentalCreationSidebarFormService: RentalCreationSidebarFormService,
  ) { }

  ngOnInit(): void {
    this.customerFormControl.valueChanges.subscribe((value) => this.onCustomerFormControlChange(value));
    this.rentalPeriodFormControl.valueChanges.subscribe((value) => this.onRentalPeriodFormControlChange(value));
  }

  private async onCustomerFormControlChange(value: string | null) {
    if (value == null) {
      this.customerOptions = [];
      return;
    }

    this.customerOptions = await this.customerService.searchCustomers$(value);

    if (Number.isNaN(Number(value))) return;

    const customer = await this.customerService.getCustomerById$(Number(value));
    if (customer == null) return;

    this.rentalCreationSidebarFormService.setCustomer(customer);
  }

  private getDateTodayPlusDays(days: number = 0): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  private formatWithOrdinal(n: number): string {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  private formatReturnDateRange(from: Date, caption?: string) {
    if (caption == null) caption = from.toLocaleString('default', { weekday: 'long' });
    return `${caption} ${this.formatWithOrdinal(from.getUTCDate())} ${from.toLocaleString('default', { month: 'long' })}`;
  }

  public getReturnDate(): string {
    const numberOfDays: Record<MovieRentalPriceModelType['period'], number> = {
      '1 day': 1,
      '2 days': 2,
      '3 days': 3,
      '1 week': 7,
      '2 weeks': 14,
      '3 weeks': 21,
      '1 month': 30,
      '2 months': 60,
      '3 months': 90,
    };

    if (this.rentalPeriodFormControl.value == null) return '';
    if (numberOfDays[this.rentalPeriodFormControl.value] == null) return '';

    return this.formatReturnDateRange(
      this.getDateTodayPlusDays(numberOfDays[this.rentalPeriodFormControl.value]),
      this.rentalPeriodFormControl.value === '1 day' ? 'Tomorrow' : undefined,
    );
  };

  public onRentalPeriodFormControlChange(value: MovieRentalPriceModelType['period'] | undefined | null) {
    if (value == null) {
      this.rentalPeriodFormControl.setValue('1 day');
      value = '1 day';
    }

    this.rentalCreationSidebarFormService.setMovieRentalPricePeriod(value);
  }
}
