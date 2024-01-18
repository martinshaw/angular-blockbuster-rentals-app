import { Injectable } from '@angular/core';
import { MovieModelType } from '../app.types';

@Injectable({
  providedIn: 'root'
})
export class RentalCreationSidebarFormService {
  private sidebarIsOpen: boolean = false;

  private moviesPendingRental: MovieModelType[] = [];

  constructor() {
    //
  }

  public setSidebarIsOpen(value: boolean = true) {
    this.sidebarIsOpen = value;
  }

  public getSidebarIsOpen(): boolean {
    return this.sidebarIsOpen;
  }

  public addMovieToPendingRental(movie: MovieModelType) {
    if (this.sidebarIsOpen === false) this.setSidebarIsOpen(true);

    this.moviesPendingRental.push(movie);
  }

  public removeMovieFromPendingRental(movie: MovieModelType) {
    if (this.moviesPendingRental.length === 1) this.setSidebarIsOpen(false);

    // This will remove all instances of the movie from the array.
    // this.moviesPendingRental = this.moviesPendingRental.filter((m) => m.id !== movie.id);

    // Only remove the first instance of the movie from the array.
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

  public getMoviesPendingRentalCount(): number {
    return this.moviesPendingRental.length;
  }

  public clearMoviesPendingRental() {
    this.setSidebarIsOpen(false);
    this.moviesPendingRental = [];
  }

  public canSubmitPendingRental(): boolean {
    return this.moviesPendingRental.length > 0;
  }

  public submitPendingRental() {
    //
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
