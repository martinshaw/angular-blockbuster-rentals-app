import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MovieType } from '../app.types';
import { SliceWordPipe } from '../slice-word.pipe';
import { SliceUntilFirstDotPipe } from '../slice-until-first-dot.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-grid-item',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    SliceWordPipe,
    SliceUntilFirstDotPipe,
  ],
  templateUrl: './movie-grid-item.component.html',
  styleUrl: './movie-grid-item.component.scss'
})
export class MovieGridItemComponent {
  @Input() movie!: MovieType;
  @Input() index!: number;

  canBeAddedToRentalCart = true;

  navigateToMovieDetails() {
    // Router.navigate(['/movie-details', this.movie.id]);
  }

  addMovieToRentalCart() {

  }
}
