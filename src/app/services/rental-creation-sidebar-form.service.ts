import { Injectable } from '@angular/core';
import { MovieModelType, MovieRentalPriceModelType } from '../app.types';

@Injectable({
  providedIn: 'root'
})
export class RentalCreationSidebarFormService {
  private sidebarIsOpen: boolean = false;
  private moviesPendingRental: MovieModelType[] = [];
  private movieRentalPricePeriod: MovieRentalPriceModelType['period'] = '1 day';

  constructor() {
    //
  }

  public resetCreationForm() {
    this.setSidebarIsOpen(false);
    this.clearMoviesPendingRental();
    this.setMovieRentalPricePeriod('1 day');
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
  }

  public removeMovieFromPendingRental(movie: MovieModelType) {
    if (this.moviesPendingRental.length === 1) this.resetCreationForm();

    for (let i = 0; i < this.moviesPendingRental.length; i++) {
      if (this.moviesPendingRental[i].id === movie.id) {
        this.moviesPendingRental.splice(i, 1);
        break;
      }
    }
  }

  public getMoviesPendingRental(): MovieModelType[] {
    return this.moviesPendingRental;
  }

  public getMoviesPendingRentalCount(withMovie?: MovieModelType): number {
    if (withMovie != null) return this.moviesPendingRental.filter(movie => movie.id === withMovie.id).length;

    return this.moviesPendingRental.length;
  }

  public clearMoviesPendingRental() {
    this.moviesPendingRental = [];
  }

  public canSubmitPendingRental(): boolean {
    return this.moviesPendingRental.length > 0;
  }

  public submitPendingRental() {
    //
  }

  public getMovieRentalPricePeriod(): MovieRentalPriceModelType['period'] {
    return this.movieRentalPricePeriod;
  }

  public setMovieRentalPricePeriod(value: MovieRentalPriceModelType['period']) {
    this.movieRentalPricePeriod = value;
  }

  public getPendingRentalTotal(): number {
    return 0.00;
  }

  public getPendingRentalDiscount(): number {
    return 0.00;
  }

  public getPendingRentalSubtotal(): number {
    return 0.00;
  }
}
