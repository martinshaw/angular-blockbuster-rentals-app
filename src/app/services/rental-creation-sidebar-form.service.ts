import { Injectable } from '@angular/core';
import { CustomerModelType, MovieModelType, MovieRentalPriceModelType } from '../app.types';
import { MoviesService } from './movies.service';
import { RentalsService } from './rentals.service';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class RentalCreationSidebarFormService {
  private sidebarIsOpen: boolean = false;

  private customer: CustomerModelType | null = null;

  private moviesPendingRental: MovieModelType[] = [];

  private movieRentalPricePeriod: MovieRentalPriceModelType['period'] = '1 day';
  private movieRentalPrices: Record<string, MovieRentalPriceModelType[]> = {};

  private discounts: any[] = [];

  constructor(
    private moviesService: MoviesService,
    private rentalsService: RentalsService,
    private utilitiesService: UtilitiesService,
  ) {
    //
  }

  readonly rentalPeriodOptions: MovieRentalPriceModelType['period'][] = [
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

  readonly rentalPeriodNumberOfDays: Record<MovieRentalPriceModelType['period'], number> = {
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

  public resetCreationForm() {
    this.setSidebarIsOpen(false);
    this.setCustomer(null);
    this.clearMoviesPendingRental();
    this.setMovieRentalPricePeriod('1 day');
    this.setMovieRentalPricesByArray([]);
  }

  public setSidebarIsOpen(value: boolean = true) {
    this.sidebarIsOpen = value;
  }

  public getSidebarIsOpen(): boolean {
    return this.sidebarIsOpen;
  }

  public setCustomer(customer: CustomerModelType | null) {
    this.customer = customer;
  }

  public getCustomer(): CustomerModelType | null {
    return this.customer;
  }

  public addMovieToPendingRental(movie: MovieModelType) {
    if (this.sidebarIsOpen === false) this.setSidebarIsOpen(true)

    this.moviesPendingRental.push(movie);

    this.refreshMovieRentalPrices();
  }

  public removeMovieFromPendingRental(movie: MovieModelType) {
    if (this.moviesPendingRental.length === 1) this.resetCreationForm();

    for (let i = 0; i < this.moviesPendingRental.length; i++) {
      if (this.moviesPendingRental[i].id === movie.id) {
        this.moviesPendingRental.splice(i, 1);
        break;
      }
    }

    this.refreshMovieRentalPrices();
  }

  public getMoviesPendingRental(): MovieModelType[] {
    return this.moviesPendingRental;
  }

  public getMoviesPendingRentalCount(withMovie?: MovieModelType): number {
    return withMovie != null ?
      this.moviesPendingRental.filter(movie => movie.id === withMovie.id).length :
      this.moviesPendingRental.length;
  }

  public clearMoviesPendingRental() {
    this.moviesPendingRental = [];
  }

  public canSubmitPendingRental(): boolean {
    if (this.customer == null) return false;
    if (this.getMoviesPendingRentalCount() <= 0) return false;
    if (this.getMovieRentalPricePeriod() == null) return false;
    if (['1 day', '2 days', '3 days', '1 week', '2 weeks', '3 weeks', '1 month', '2 months', '3 months'].includes(this.getMovieRentalPricePeriod()) === false) return false;
    if (this.getPendingRentalSubtotal() < 0) return false;
    if (this.getPendingRentalDiscount() < 0) return false;
    if (this.getPendingRentalTotal() < 0) return false;

    return true;
  }

  public async submitPendingRental() {
    if (this.canSubmitPendingRental() === false) return;

    const customer = this.getCustomer();
    if (customer == null) return;

    const movies = this.getMoviesPendingRental();
    if (movies == null) return;
    if (movies.length <= 0) return;

    console.log('RentalCreationSidebarFormService.submitPendingRental()');
    console.log('customer', this.customer);
    console.log('movies', this.moviesPendingRental);
    console.log('period', this.getMovieRentalPricePeriod());
    console.log('subtotal', this.getPendingRentalSubtotal());
    console.log('discount', this.getPendingRentalDiscount());
    console.log('total', this.getPendingRentalTotal());

    const newRental = await this.rentalsService.createRental$(
      customer,
      this.utilitiesService.getDateTodayPlusDays(),
      this.utilitiesService.getDateTodayPlusDays(this.rentalPeriodNumberOfDays[this.getMovieRentalPricePeriod()]),
      null,
    );

    if (newRental == null) {
      // In a real application, we would want to display an error message to the user and log the error in the backend.
      console.error('An error occurred while creating the rental.');
      return;
    }

    const newRentalMovies = await Promise.all(this.rentalsService.addMoviesToRental$(newRental, movies));

    /**
     * In reality, the counts on the Movie models would be cached counts from a separate table of
     * individual items owned by Blockbuster.
     * For this demo application, we will just update the counts on the Movie models.
     */
    newRentalMovies.forEach((rentalMoviePivot) => {
      const movie = await this.moviesService.get
    });
  }

  public getMovieRentalPricePeriod(): MovieRentalPriceModelType['period'] {
    return this.movieRentalPricePeriod;
  }

  public setMovieRentalPricePeriod(value: MovieRentalPriceModelType['period']) {
    this.movieRentalPricePeriod = value;

    this.refreshMovieRentalPrices();
  }

  public getMovieRentalPrice(movie: MovieModelType): MovieRentalPriceModelType[] {
    if (movie.id == null) return [];
    if (this.movieRentalPrices[movie.id] == null) return [];

    return this.movieRentalPrices[movie.id].filter(price => price.period === this.getMovieRentalPricePeriod()) ?? [];
  }

  public getMovieRentalPrices(): Record<string, MovieRentalPriceModelType[]> {
    return this.movieRentalPrices;
  }

  public setMovieRentalPricesByArray(prices: MovieRentalPriceModelType[]) {
    this.movieRentalPrices = prices.reduce((prices, price) => {
      if (prices[price.movie_id] == null) prices[price.movie_id] = [];
      prices[price.movie_id].push(price);
      return prices;
    }, {} as Record<string, MovieRentalPriceModelType[]>);
  }

  public async refreshMovieRentalPrices(): Promise<void> {
    return this.moviesService
      .getMovieRentalPrices$(
        this.getMoviesPendingRental().map(movie => movie.id),
        [this.getMovieRentalPricePeriod()],
      )
      .then((prices) => this.setMovieRentalPricesByArray(prices))
      .catch((error) => {
        console.error(error);
      });
  }

  public getPendingRentalSubtotal(): number {
    return this.getMoviesPendingRental().reduce((total, movie) => {
      const price = this.getMovieRentalPrice(movie).find(price => price.period === this.getMovieRentalPricePeriod());
      if (price == null) return total;
      return total + price.price;
    },
      0.00
    );
  }

  public getPendingRentalDiscount(): number {
    return 0.00;
  }

  public getPendingRentalTotal(): number {
    return this.getPendingRentalSubtotal() - this.getPendingRentalDiscount();
  }
}
