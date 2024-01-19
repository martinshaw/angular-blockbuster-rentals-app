import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CustomerModelType } from '../app.types';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(
    public apiService: ApiService,
  ) { }

  getAllCustomers$(): Promise<CustomerModelType[]> {
    return this.apiService
      .makeRequest<CustomerModelType[]>('/customers')
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  getCustomerById$(customerId: CustomerModelType['id']): Promise<CustomerModelType | null> {
    if (customerId == null) return Promise.resolve(null);

    return this.apiService
      .makeRequest<CustomerModelType>(`/customers/${customerId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        return null;
      });
  }
}
