import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { faker } from '@faker-js/faker';
import { MovieFromDataScrapingType } from '../app.types';

export type MovieModelType = MovieFromDataScrapingType & {
  price: number;
};

export type RentalModelType = {
  id?: number;

  startDateAt: Date | null;
  endDateAt: Date | null;
  returnDateAt: Date | null;

  customerId: number;

  movies?: MovieModelType[];
};

export type CustomerModelType = {
  id?: number;

  name: string;
  email: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  region: string;
  postal_code: string;
  country: string;

  rentals?: RentalModelType[];
};

export type RentalMoviePivotModelType = {
  rentalId: number;
  movieId: number;
  returnDateAt: Date | null;
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService extends Dexie {
  movies!: Table<MovieModelType, number>;
  rentals!: Table<RentalModelType, number>;
  customers!: Table<CustomerModelType, number>;

  constructor() {
    super('BlockbusterRentalAppLocalDatabase');

    this.version(1).stores({
      movies: '++id, title, year, length, rating, ranking, voteCount, metarating, description',
      rentals: '++id, startDateAt, endDateAt, returnDateAt, customerId',
      customers: '++id, name, email, address_line_1, address_line_2, city, region, postal_code, country',
    });

    this.movies = this.table('movies');
    this.rentals = this.table('rentals');
    this.customers = this.table('customers');

    this.open().then(data => {
      this.on('populate', () => {
        this.populate()
      });
    });
  }

  async populate() {
    console.log('populate', window.location.origin, window, document.location.origin, document);

    const moviesFromDataScraping: MovieModelType[] = await fetch('/assets/movieData.json')
      .then(response => response.json());

    console.log('moviesFromDataScraping', moviesFromDataScraping);

    const moviesWithPrices: MovieModelType[] = moviesFromDataScraping.map(movie => ({ ...movie, price: 5 }));

    console.log(await this.movies.bulkAdd(moviesWithPrices));

    // Create 20 customers with data from faker.js
    const customers: CustomerModelType[] = [];
    for (let i = 0; i < 20; i++) {
      customers.push({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        address_line_1: faker.address.streetAddress(),
        address_line_2: faker.address.secondaryAddress(),
        city: faker.address.city(),
        region: faker.address.state(),
        postal_code: faker.address.zipCode(),
        country: faker.address.country(),
      });
    }

    await this.customers.bulkAdd(customers);
  }
}
