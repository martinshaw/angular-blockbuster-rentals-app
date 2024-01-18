import { Component } from '@angular/core';
import { MovieGridItemComponent } from '../movie-grid-item/movie-grid-item.component';
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router';
import { MoviesService } from '../../services/movies.service';
import { MovieModelType } from '../../app.types';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-movie-grid',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MovieGridItemComponent,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './movie-grid.component.html',
  styleUrl: './movie-grid.component.scss'
})
export class MovieGridComponent {
  public movies$ = this.moviesService.getAllMovies$();

  constructor(
    public moviesService: MoviesService,
  ) {
    //
  }

  ngOnInit() {
    //
  }

  keyMovieBy(index: number, list: MovieModelType) {
    return `${list.id}${list.title}`;
  }
}
