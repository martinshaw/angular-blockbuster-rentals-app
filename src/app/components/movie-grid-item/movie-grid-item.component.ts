import { ChangeDetectionStrategy, Component, Input, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MovieType } from '../../app.types';
import { SliceWordPipe } from '../../pipes/slice-word.pipe';
import { SliceUntilFirstDotPipe } from '../../pipes/slice-until-first-dot.pipe';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { RentalCreationSidebarFormService } from '../../services/rental-creation-sidebar-form.service';

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
  @Input() movie!: MovieType;
  @Input() index!: number;

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

  canBeAddedToRentalCart = true;

  addMovieToRentalCart(movie: MovieType) {
    this.rentalCreationSidebarFormService.addMovieToPendingRental(movie);
  }
}



