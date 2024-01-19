import { Injectable } from '@angular/core';
import { MovieModelType, MovieRentalPriceModelType } from '../app.types';
import { MoviesService } from './movies.service';

@Injectable({
  providedIn: 'root'
})
export class RentalCreationSidebarFormService {
  private sidebarIsOpen: boolean = false;
  private moviesPendingRental: MovieModelType[] = [];
  private movieRentalPricePeriod: MovieRentalPriceModelType['period'] = '1 day';

  private movieRentalPrices: Record<string, MovieRentalPriceModelType[]> = {};

  private discounts: any[] = [];

  constructor(
    private moviesService: MoviesService,
  ) {
    //
  }

  public resetCreationForm() {
    this.setSidebarIsOpen(false);
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
    if (this.getMoviesPendingRentalCount() <= 0) return false;
    if (this.getMovieRentalPricePeriod() == null) return false;
    if (['1 day', '2 days', '3 days', '1 week', '2 weeks', '3 weeks', '1 month', '2 months', '3 months'].includes(this.getMovieRentalPricePeriod()) === false) return false;
    if (this.getPendingRentalSubtotal() < 0) return false;
    if (this.getPendingRentalDiscount() < 0) return false;
    if (this.getPendingRentalTotal() < 0) return false;

    return true;
  }

  public submitPendingRental() {
    //
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

    return this.movieRentalPrices[movie.id] ?? [];
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
