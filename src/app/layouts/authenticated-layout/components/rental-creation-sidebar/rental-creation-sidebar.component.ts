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
import { UtilitiesService } from '../../../../services/utilities.service';
import { AutofocusDirective } from '../../../../directives/autofocus.directive';


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

  constructor(
    public customerService: CustomersService,
    public rentalCreationSidebarFormService: RentalCreationSidebarFormService,
    public utilitiesService: UtilitiesService,
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

  public getReturnDate(): string {

    if (this.rentalPeriodFormControl.value == null) return '';
    if (this.rentalCreationSidebarFormService.rentalPeriodNumberOfDays[this.rentalPeriodFormControl.value] == null) return '';

    return this.utilitiesService.formatReturnDateRange(
      this.utilitiesService.getDateTodayPlusDays(this.rentalCreationSidebarFormService.rentalPeriodNumberOfDays[this.rentalPeriodFormControl.value]),
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
