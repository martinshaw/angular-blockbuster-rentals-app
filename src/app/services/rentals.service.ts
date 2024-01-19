import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { RentalModelType } from '../app.types';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {
  constructor(
    public apiService: ApiService,
  ) { }

  getAllRentals$(): Promise<RentalModelType[]> {
    return this.apiService
      .makeRequest<RentalModelType[]>('/rentals')
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  getRentalById$(rentalId: RentalModelType['id']): Promise<RentalModelType | null> {
    if (rentalId == null) return Promise.resolve(null);

    return this.apiService
      .makeRequest<RentalModelType>(`/rentals/${rentalId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return null;
      });
  }

  searchRentals$(searchTerm: string): Promise<RentalModelType[]> {
    return this.apiService
      .makeRequest<RentalModelType[]>('/rentals', 'GET', {q: searchTerm})
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return [];
      });
  }
}
