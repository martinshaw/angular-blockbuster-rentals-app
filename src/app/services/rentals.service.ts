import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CustomerModelType, MovieModelType, MovieRentalPriceModelType, RentalModelType } from '../app.types';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {
  constructor(
    public apiService: ApiService,
  ) { }

  getAllRentals$(): Promise<RentalModelType[]> {
    return this.apiService
      .makeRequest<RentalModelType[]>('/rentals', 'GET', {_expand: 'customer'})
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  getRentalById$(rentalId: RentalModelType['id']): Promise<RentalModelType | null> {
    if (rentalId == null) return Promise.resolve(null);

    return this.apiService
      .makeRequest<RentalModelType>(`/rentals/${rentalId}`, 'GET', {_expand: 'customer'})
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  searchRentals$(searchTerm: string): Promise<RentalModelType[]> {
    return this.apiService
      .makeRequest<RentalModelType[]>('/rentals', 'GET', { q: searchTerm, _expand: 'customer' })
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  createRental$(
    customer: CustomerModelType,
    startDateAt: Date | null = null,
    endDateAt: Date | null = null,
    returnDateAt: Date | null = null,
  ): Promise<RentalModelType | null> {
    return this.apiService
      .makeRequest<RentalModelType>('/rentals', 'POST', {}, {
        customer_id: customer.id,
        start_date_at: startDateAt,
        end_date_at: endDateAt,
        return_date_at: returnDateAt,
      })
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return null;
      });
  }
}
