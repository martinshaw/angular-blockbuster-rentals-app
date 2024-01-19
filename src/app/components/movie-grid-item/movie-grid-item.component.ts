import { Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { SliceWordPipe } from '../../pipes/slice-word.pipe';
import { SliceUntilFirstDotPipe } from '../../pipes/slice-until-first-dot.pipe';
import { RentalCreationSidebarFormService } from '../../services/rental-creation-sidebar-form.service';
import { MovieModelType, RentalModelType } from '../../app.types';

@Component({
  selector: 'app-movie-grid-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    SliceWordPipe,
    SliceUntilFirstDotPipe,
  ],
  templateUrl: './movie-grid-item.component.html',
  styleUrl: './movie-grid-item.component.scss',
})
export class MovieGridItemComponent implements OnInit, OnDestroy {
  @Input() movie!: MovieModelType;
  @Input() showAvailability: boolean = true;
  @Input() showStatistics: boolean = true;
  @Input() showDescription: boolean = true;
  @Input() showBarcode: boolean = false;
  @Input() showAddToRentalCartButton: boolean = true;
  @Input() showReturnItemButton: boolean = false;
  @Input() center: boolean = false;
  @Input() rental: RentalModelType | null = null;

  constructor(
    private ngZone: NgZone,
    private router: Router,

    public rentalCreationSidebarFormService: RentalCreationSidebarFormService,
  ) {
    //
  }

  ngOnInit(): void {
    //
  }

  ngOnDestroy() {
    //
  }

  /**
   * I believe that I should be able to use the routerLink directive in the template as demonstrated in the Angular Material and Angular documentation.
   * But it seems to be emitting a warning in the console that I don't understand.
   *
   * Used this recommended workaround instead: https://stackoverflow.com/questions/53133544/angular-7-routerlink-directive-warning-navigation-triggered-outside-angular-zon
   */
  public navigate(commands: any[]): void {
    this.ngZone.run(() => this.router.navigate(commands)).then();
  }

  public getCountAvailableForRentalWithPending(): number {
    if (this.movie?.count_available_for_rental == null) return 0;

    const count = this.movie.count_available_for_rental - this.rentalCreationSidebarFormService.getMoviesPendingRentalCount(this.movie);
    return count < 0 ? 0 : count;
  }

  public canBeAddedToRentalCart(): boolean {
    return this.getCountAvailableForRentalWithPending() > 0;
  }

  public addMovieToRentalCart(movie: MovieModelType) {
    this.rentalCreationSidebarFormService.addMovieToPendingRental(movie);
  }

  public returnItemFromRental(movie: MovieModelType) {
    if (this.rental == null) return;

    this.rentalCreationSidebarFormService.returnItemFromRental(movie, this.rental);
  }
}



